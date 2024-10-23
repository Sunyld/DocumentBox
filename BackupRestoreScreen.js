// src/screens/BackupRestoreScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BackupRestoreScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Backup & Restauração</Text>
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

export default BackupRestoreScreen;
