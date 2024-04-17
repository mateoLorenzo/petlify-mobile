import React from 'react';
import {Controller, FieldValues, RegisterOptions} from 'react-hook-form';
import {StyleSheet, Text, TextInput, TextStyle} from 'react-native';

interface Props {
  control: any;
  name: string;
  placeholder: string;
  style?: TextStyle;
  secureTextEntry?: boolean;
  rules?: RegisterOptions<FieldValues>;
}

export const CustomInput = ({
  control,
  name,
  placeholder,
  style,
  secureTextEntry,
  rules = {},
}: Props) => {
  return (
    <Controller
      control={control}
      rules={rules}
      name={name}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            style={{
              ...styles.input,
              ...style,
              ...(error ? styles.borderError : styles.borderNormal),
            }}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
          />
          {error && (
            <Text style={styles.errorText}>{error.message || 'Error'}</Text>
          )}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 55,
    borderWidth: 0.5,
    borderRadius: 3,
    paddingHorizontal: 20,
    fontFamily: 'Poppins-Regular',
    marginVertical: 5,
  },
  borderNormal: {
    borderColor: '#8F8F8F',
  },
  borderError: {
    borderColor: 'red',
  },
  borderSuccess: {
    borderColor: 'green',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    alignSelf: 'flex-start',
  },
});
