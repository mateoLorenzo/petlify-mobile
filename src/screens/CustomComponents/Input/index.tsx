import React, {useState} from 'react';
import {Controller, FieldValues, RegisterOptions} from 'react-hook-form';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

interface Props extends TextInputProps {
  control: any;
  name: string;
  placeholder: string;
  style?: TextStyle;
  containerStyle?: TextStyle;
  rules?: RegisterOptions<FieldValues>;
  isPasswordField?: boolean;
  mainContainerStyle?: ViewStyle;
}

export const CustomTextInput = ({
  control,
  name,
  placeholder,
  style,
  isPasswordField,
  rules = {},
  containerStyle,
  mainContainerStyle,
  ...props
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Controller
      control={control}
      rules={rules}
      name={name}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <View style={mainContainerStyle}>
          <View style={{...styles.container, ...containerStyle}}>
            <TextInput
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder={placeholder}
              secureTextEntry={isPasswordField && !showPassword}
              style={{
                ...styles.input,
                ...style,
                ...(error ? styles.borderError : styles.borderNormal),
              }}
              {...props}
            />
            {isPasswordField && (
              <TouchableOpacity
                style={styles.eyeIconContainer}
                onPress={() => setShowPassword(!showPassword)}
                activeOpacity={0.5}>
                <Icon
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={25}
                  color="#8F8F8F"
                />
              </TouchableOpacity>
            )}
          </View>
          {error && (
            <Text style={styles.errorText}>{error.message || 'Error'}</Text>
          )}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 55,
    borderWidth: 0.5,
    borderRadius: 3,
    paddingHorizontal: 20,
    fontFamily: 'Poppins-Regular',
  },
  borderNormal: {
    borderColor: '#8F8F8F',
  },
  borderError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    alignSelf: 'flex-start',
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 0,
    width: 70,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
