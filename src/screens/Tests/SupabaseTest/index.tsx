import React, {useState} from 'react';
import {Alert, StyleSheet, View, AppState, Text, TextInput} from 'react-native';
// import {supabase} from '../lib/supabase';
import {supabase} from '../../../lib/supabase';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CustomButton} from '../../../components/CustomButton';
// import {Button, Input} from '@rneui/themed';

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', state => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function SupabaseTestScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const {top} = useSafeAreaInsets();

  async function signInWithEmail() {
    setLoading(true);
    const {error} = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
    }
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: {session},
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
    }
    if (!session) {
      Alert.alert('Please check your inbox for email verification!');
    }
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Text
        style={{
          marginTop: top,
          ...styles.title,
        }}>
        Supabase Test
      </Text>
      <TextInput
        style={styles.input}
        placeholderTextColor={'gray'}
        onChangeText={text => setEmail(text)}
        value={email}
        placeholder="Email"
        autoCapitalize={'none'}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor={'gray'}
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry={true}
        placeholder="Password"
        autoCapitalize={'none'}
      />
      <View style={styles.buttonsContainer}>
        <CustomButton
          disabled={loading}
          onPress={() => signInWithEmail()}
          containerStyle={styles.loginButton}
          style={styles.button}
          label="Login"
        />
        <CustomButton
          disabled={loading}
          onPress={() => signUpWithEmail()}
          containerStyle={styles.registerButton}
          style={styles.button}
          label="Register"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 24,
    color: '#000',
    marginBottom: 10,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  input: {
    width: '100%',
    height: 55,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginTop: 10,
    padding: 15,
    fontFamily: 'Poppins-Regular',
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  loginButton: {
    width: undefined,
    flex: 1,
  },
  registerButton: {
    width: undefined,
    flex: 1,
    marginLeft: 10,
  },
  button: {
    marginTop: 10,
  },
});
