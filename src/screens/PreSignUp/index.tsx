import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Logo from '../../../assets/images/logo.svg';
import GoogleIcon from '../../../assets/images/google.svg';
import FacebookIcon from '../../../assets/images/facebook.svg';
import EmailIcon from '../../../assets/images/email.svg';
import {useNavigation} from '@react-navigation/native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {supabase} from '../../lib/supabase';
import {AccessToken, GraphRequest, LoginManager} from 'react-native-fbsdk-next';
import {GraphRequestManager} from 'react-native-fbsdk-next';
import React from 'react';

const PreSignUpScreen = () => {
  const {top} = useSafeAreaInsets();
  const navigation = useNavigation();

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();

      if (idToken) {
        const {data, error} = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: idToken,
        });
        console.log('after supabase', data, Boolean(data));
        console.log('error', error, Boolean(error));

        if (data) {
          navigation.navigate('BottomTabNavigator' as never);
        }
      }
    } catch (apiError) {
      console.log('ApiError', apiError);
    }
  };

  const handleLoginResult = (result: any) => {
    if (result.isCancelled) {
      console.log('Login cancelled');
    } else {
      fetchAccessToken();
    }
  };

  const fetchAccessToken = () => {
    AccessToken.getCurrentAccessToken()
      .then(async data => {
        if (data) {
          const accessToken = data.accessToken;

          fetchUserInfo(accessToken);
        } else {
          console.log('No access token found');
        }
      })
      .catch(error => {
        console.log('Error fetching access token:', error);
      });
  };

  const fetchUserInfo = (accessToken: string) => {
    const responseInfoCallback = async (
      responseError: any,
      responseResult: any,
    ) => {
      if (responseError) {
        console.log('responseError', responseError);
        Alert.alert('Error fetching data: ' + responseError.toString());
      } else {
        console.log('responseResult', responseResult);
        Alert.alert(
          'Success fetching data! \n',
          `Name: ${responseResult?.name} \n id: ${responseResult?.id}`,
        );
      }
    };

    const infoRequest = new GraphRequest(
      '/me',
      {
        accessToken: accessToken,
        parameters: {
          fields: {
            string: 'email,name,first_name,middle_name,last_name',
          },
        },
      },
      responseInfoCallback,
    );

    new GraphRequestManager().addRequest(infoRequest).start();
  };

  const loginWithFacebook = () => {
    LoginManager.logInWithPermissions(['public_profile']).then(
      handleLoginResult,
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  return (
    <View style={{...styles.container, paddingTop: top}}>
      <Logo height={100} width={100} style={styles.logo} />
      <Text style={styles.title}>¡Registrate Para Ingresar!</Text>
      <Text style={styles.subtitle}>Elige como te gustaria registrarte</Text>

      <TouchableOpacity
        style={styles.socialButton}
        activeOpacity={0.6}
        onPress={handleGoogleLogin}>
        <GoogleIcon height={22} width={22} />
        <Text style={styles.socialButtonText}>Ingresar Con Google</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.socialButton}
        activeOpacity={0.6}
        onPress={loginWithFacebook}>
        <View style={styles.facebookButton}>
          <FacebookIcon height={22} width={22} />
          <Text style={styles.socialButtonText}>Ingresar Con Facebook</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.socialButton}
        activeOpacity={0.6}
        onPress={() => navigation.navigate('RegisterScreen' as never)}>
        <EmailIcon height={22} width={22} />
        <Text style={styles.socialButtonText}>Ingresar Con Email</Text>
      </TouchableOpacity>

      <View style={styles.spacer} />

      <Text style={styles.disclaimerText}>
        Al registrarte estas aceptando nuestros
      </Text>
      <TouchableOpacity>
        <Text style={styles.termsAndConditionsText}>
          Terminos y Condiciones
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  logo: {
    marginTop: 40,
  },
  title: {
    fontSize: 22,
    marginTop: 20,
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    marginTop: Platform.OS === 'ios' ? 5 : 0,
    marginBottom: 40,
    fontWeight: '100',
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  socialButton: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#D2D2D2',
    width: '100%',
    paddingVertical: 20,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  socialButtonText: {
    color: '#4F4F4F',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    marginLeft: 10,
  },
  facebookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  facebookLoginButton: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0,
  },
  spacer: {
    flex: 1,
  },
  disclaimerText: {
    color: '#8F8F8F',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  termsAndConditionsText: {
    color: '#000',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    marginBottom: 40,
    textDecorationLine: 'underline',
  },
});

export default PreSignUpScreen;
