// src/screens/DonateScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DonateScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Doar para o App</Text>
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

export default DonateScreen;

