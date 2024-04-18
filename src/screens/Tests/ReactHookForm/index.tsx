import React from 'react';
import {useForm} from 'react-hook-form';
import {Button, StyleSheet, View} from 'react-native';
import {CustomTextInput} from '../../../components/CustomTextInput';

const ReactHookFormScreen = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  console.log('errors', errors);

  return (
    <View style={styles.container}>
      <CustomTextInput
        name="email"
        control={control}
        placeholder="Email"
        rules={{required: 'Email is required'}}
        style={styles.marginBottom10}
      />
      <CustomTextInput
        name="password"
        control={control}
        placeholder="Password"
        secureTextEntry
        rules={{
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must have at least 6 characters',
          },
        }}
      />
      <Button
        title="Submit"
        onPress={handleSubmit(data => console.log('submit', data))}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  marginBottom10: {
    marginBottom: 10,
  },
});

export default ReactHookFormScreen;
