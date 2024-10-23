import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';

export default function DocumentDetails({ route, navigation }) {
  const { document } = route.params;

  const [documentName, setDocumentName] = useState(document.name);
  const [expiryDate, setExpiryDate] = useState(document.expiryDate);
  const [image, setImage] = useState(document.image);

  const saveChanges = () => {
    // Aqui você pode implementar a lógica para salvar as edições
    console.log("Document edited: ", { documentName, expiryDate });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome do Documento</Text>
      <TextInput 
        style={styles.input} 
        value={documentName} 
        onChangeText={setDocumentName} 
      />

      <Text style={styles.label}>Data de Validade</Text>
      <TextInput 
        style={styles.input} 
        value={expiryDate} 
        onChangeText={setExpiryDate} 
        placeholder="DD/MM/AAAA"
      />

      {image && <Image source={{ uri: image }} style={styles.image} />}

      <Button title="Salvar Alterações" onPress={saveChanges} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 20, borderRadius: 5 },
  image: { width: '100%', height: 200, marginTop: 20, marginBottom: 20 },
});
