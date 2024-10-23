// src/screens/TermsConditionsScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TermsConditionsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Termos e Condições</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TermsConditionsScreen;
