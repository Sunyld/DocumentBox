// src/screens/LockScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LockScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Bloquear o App</Text>
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

export default LockScreen;

