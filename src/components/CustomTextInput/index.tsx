/* eslint-disable react-native/no-inline-styles */
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
import {RegisterFormFields, fieldsColors} from '../../constants';

interface Props extends TextInputProps {
  control: any;
  name: RegisterFormFields;
  placeholder: string;
  style?: TextStyle;
  containerStyle?: TextStyle;
  rules?: RegisterOptions<FieldValues>;
  isPasswordField?: boolean;
  mainContainerStyle?: ViewStyle;
  fieldColor?: fieldsColors;
  errorMessages?: () => JSX.Element;
  validateBlurField?: (fieldName: RegisterFormFields, value: string) => void;
  validateChangeField?: (fieldName: RegisterFormFields, value: string) => void;
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
  fieldColor = 'gray',
  errorMessages,
  validateBlurField,
  validateChangeField,
  ...props
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const getBorderColor = (fieldBorderColor: fieldsColors) => {
    if (fieldBorderColor === 'red') {
      return 'red';
    }
    if (fieldBorderColor === 'green') {
      return '#12BC04';
    }
    return 'lightgray';
  };

  const onBlur = (value: string) => {
    if (validateBlurField) {
      return validateBlurField(name, value);
    }
  };

  const onChangeText = (text: string) => {
    if (validateChangeField) {
      return validateChangeField(name, text);
    }
  };

  return (
    <Controller
      control={control}
      rules={rules}
      name={name}
      render={({field: {value, onChange}, fieldState: {error}}) => (
        <View style={mainContainerStyle}>
          <View style={{...styles.container, ...containerStyle}}>
            <TextInput
              value={value}
              placeholder={placeholder}
              onBlur={() => onBlur(value)}
              onChangeText={text => {
                onChange(text);
                return onChangeText(text);
              }}
              secureTextEntry={isPasswordField && !showPassword}
              style={{
                ...styles.input,
                ...style,
                borderColor: error ? 'red' : getBorderColor(fieldColor),
              }}
              {...props}
            />
            {isPasswordField && (
              <TouchableOpacity
                style={styles.eyeIconContainer}
                onPress={() => setShowPassword(!showPassword)}
                activeOpacity={0.5}>
                <Icon
                  size={25}
                  color="#8F8F8F"
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                />
              </TouchableOpacity>
            )}
          </View>
          {error && !errorMessages && (
            <Text style={styles.errorText}>{error.message || 'Error'}</Text>
          )}
          {error && errorMessages && errorMessages()}
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
    borderWidth: 1,
    borderRadius: 3,
    paddingHorizontal: 20,
    fontFamily: 'Poppins-Regular',
  },
  borderNormal: {
    borderColor: 'lightgray',
  },
  borderError: {
    borderColor: 'red',
  },
  borderSuccess: {
    borderColor: '#12BC04',
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
