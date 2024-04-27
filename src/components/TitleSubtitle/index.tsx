import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Props {
  title?: string;
  subtitle?: string;
}

const TitleSubtitle = ({title, subtitle}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title || 'Title Displays Here'}</Text>
      <Text style={styles.subtitle}>
        {subtitle || 'This one is the subtitle, very cool right?'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 26,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
});

export default TitleSubtitle;
