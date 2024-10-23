// src/screens/ShareScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ShareScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Enviar para Amigos</Text>
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

export default ShareScreen;
