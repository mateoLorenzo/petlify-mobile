import React from 'react';
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
import {AccessToken, GraphRequest, LoginButton} from 'react-native-fbsdk-next';
import {GraphRequestManager} from 'react-native-fbsdk-next';

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
          navigation.navigate('HomeScreen' as never);
        }
      }
    } catch (apiError) {
      console.log('ApiError', apiError);
    }
  };

  const onLoginFinished = (error: any, result: any) => {
    console.log('onLoginFinished', error, result);
    if (error) {
      Alert.alert('login has error: ' + error + result);
    } else if (result.isCancelled) {
      Alert.alert('login is cancelled.');
    } else {
      AccessToken.getCurrentAccessToken().then(data => {
        console.log('data form fb', data);
        let accessToken = data?.accessToken;

        const responseInfoCallback = (
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
            console.log('Success fetching data: ' + responseResult);
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

        console.log('infoRequest', infoRequest);

        // Start the graph request.
        new GraphRequestManager().addRequest(infoRequest).start();
      });
    }
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

      <TouchableOpacity style={styles.socialButton} activeOpacity={0.6}>
        <View style={styles.facebookButton}>
          <FacebookIcon height={22} width={22} />
          <Text style={styles.socialButtonText}>Ingresar Con Facebook</Text>
        </View>
        <LoginButton
          onLoginFinished={onLoginFinished}
          onLogoutFinished={() => Alert.alert('logout.')}
          style={styles.facebookLoginButton}
        />
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

// const response = {
//   session: {
//     access_token:
//       'eyJhbGciOiJIUzI1NiIsImtpZCI6ImdOSVpUaXZ1RnBZVGozOCsiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzIwNzU5ODUxLCJpYXQiOjE3MjA3NTYyNTEsImlzcyI6Imh0dHBzOi8vd2Jnb2VwZW5tZ2lveWh6Zm54aHcuc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6IjAxMWEwNGI3LTE1OTYtNDE3MS1iYTQ3LTZkMzg2MmI1ZWZhOSIsImVtYWlsIjoibWF0ZW9sb3JlbnpvLmRldkBnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6Imdvb2dsZSIsInByb3ZpZGVycyI6WyJnb29nbGUiXX0sInVzZXJfbWV0YWRhdGEiOnsiYXZhdGFyX3VybCI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0xjSlJMZ0xVNFhGZkMtV0ZDZ2VVbmVfUnJIcjVQcXF1Tk5PS2dLRGV3SE9NVGVGQ0ttPXM5Ni1jIiwiZW1haWwiOiJtYXRlb2xvcmVuem8uZGV2QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmdWxsX25hbWUiOiJNYXRlbyBMb3JlbnpvIiwiaXNzIjoiaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tIiwibmFtZSI6Ik1hdGVvIExvcmVuem8iLCJwaG9uZV92ZXJpZmllZCI6ZmFsc2UsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NMY0pSTGdMVTRYRmZDLVdGQ2dlVW5lX1JySHI1UHFxdU5OT0tnS0Rld0hPTVRlRkNLbT1zOTYtYyIsInByb3ZpZGVyX2lkIjoiMTA5NjUwODc0NjA3MTMxNDY4NjM3Iiwic3ViIjoiMTA5NjUwODc0NjA3MTMxNDY4NjM3In0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoib2F1dGgiLCJ0aW1lc3RhbXAiOjE3MjA3NTYyNTF9XSwic2Vzc2lvbl9pZCI6IjBhZWYwZWExLThhMTItNDM2Zi05NmQ4LTdiZjc1ZWFmZTExYSIsImlzX2Fub255bW91cyI6ZmFsc2V9.xfw_p2gsSyg2Pu8gbKwN2F0KjcOE-lxY2B397VPXICU',
//     expires_at: 1720759851,
//     expires_in: 3600,
//     refresh_token: 'LXLisOHfUvaYdmyZFnIumA',
//     token_type: 'bearer',
//     user: {
//       app_metadata: [Object],
//       aud: 'authenticated',
//       confirmed_at: '2024-07-09T22:12:33.222313Z',
//       created_at: '2024-07-09T22:12:33.217157Z',
//       email: 'mateolorenzo.dev@gmail.com',
//       email_confirmed_at: '2024-07-09T22:12:33.222313Z',
//       id: '011a04b7-1596-4171-ba47-6d3862b5efa9',
//       identities: [Array],
//       is_anonymous: false,
//       last_sign_in_at: '2024-07-12T03:50:50.999571355Z',
//       phone: '',
//       role: 'authenticated',
//       updated_at: '2024-07-12T03:50:51.001857Z',
//       user_metadata: [Object],
//     },
//   },
//   user: {
//     app_metadata: {provider: 'google', providers: [Array]},
//     aud: 'authenticated',
//     confirmed_at: '2024-07-09T22:12:33.222313Z',
//     created_at: '2024-07-09T22:12:33.217157Z',
//     email: 'mateolorenzo.dev@gmail.com',
//     email_confirmed_at: '2024-07-09T22:12:33.222313Z',
//     id: '011a04b7-1596-4171-ba47-6d3862b5efa9',
//     identities: [[Object]],
//     is_anonymous: false,
//     last_sign_in_at: '2024-07-12T03:50:50.999571355Z',
//     phone: '',
//     role: 'authenticated',
//     updated_at: '2024-07-12T03:50:51.001857Z',
//     user_metadata: {
//       avatar_url:
//         'https://lh3.googleusercontent.com/a/ACg8ocLcJRLgLU4XFfC-WFCgeUne_RrHr5PqquNNOKgKDewHOMTeFCKm=s96-c',
//       email: 'mateolorenzo.dev@gmail.com',
//       email_verified: true,
//       full_name: 'Mateo Lorenzo',
//       iss: 'https://accounts.google.com',
//       name: 'Mateo Lorenzo',
//       phone_verified: false,
//       picture:
//         'https://lh3.googleusercontent.com/a/ACg8ocLcJRLgLU4XFfC-WFCgeUne_RrHr5PqquNNOKgKDewHOMTeFCKm=s96-c',
//       provider_id: '109650874607131468637',
//       sub: '109650874607131468637',
//     },
//   },
// };
