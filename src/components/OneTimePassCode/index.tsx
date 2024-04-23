import React, {FunctionComponent, useRef} from 'react';
import {StyleSheet, TextInput, TextStyle, View} from 'react-native';

interface Props {
  length: number;
  value: Array<string>;
  disabled: boolean;
  onChange: (value: Array<string>) => void;
  customStyles?: TextStyle;
}

export const OTPInput: FunctionComponent<Props> = ({
  length,
  value,
  disabled,
  onChange,
  customStyles,
}) => {
  const inputRefs = useRef<Array<TextInput>>([]);

  const onChangeValue = (text: string, index: number) => {
    if (value.length === 0) {
      onChange([text]);
      return;
    }
    const newValue = value.map((item, valueIndex) => {
      console.log('inputRefs', inputRefs.current[1]);
      // if (valueIndex === index) {
      return text;
      // }
      // return item;
    });
    onChange(newValue);
    console.log('newValue', newValue);
  };

  const handleChange = (text: string, index: number) => {
    onChangeValue(text, index);
    if (text.length !== 0) {
      return inputRefs.current[index + 1]?.focus();
    }
    return inputRefs?.current[index - 1]?.focus();
  };

  return (
    <View style={styles.container}>
      {new Array(length).fill(0).map((_, index) => (
        <TextInput
          ref={ref => {
            if (ref && !inputRefs.current.includes(ref)) {
              inputRefs.current = [...inputRefs.current, ref];
            }
          }}
          key={index}
          style={{...styles.input, ...customStyles}}
          maxLength={1}
          contextMenuHidden
          selectTextOnFocus
          editable={!disabled}
          keyboardType="decimal-pad"
          testID={`otp-input-${index}`} //TODO: Remove xd
          onChangeText={text => handleChange(text, index)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    fontSize: 24,
    textAlign: 'center',
    width: 50,
    height: 50,
    backgroundColor: 'transparent',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#8F8F8F',
    fontFamily: 'Poppins-Regular',
  },
});
