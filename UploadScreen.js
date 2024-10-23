import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons';

export default function UploadScreen({ navigation, route }) {
    const { categories } = route.params; // Recebe as categorias do Dashboard
    const [documentName, setDocumentName] = useState('');
    const [category, setCategory] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [description, setDescription] = useState('');
    const [fileUri, setFileUri] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successMessageVisible, setSuccessMessageVisible] = useState(false);

    const handleDocumentPick = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
            if (result.type === 'success') {
                setFileUri(result.uri);
            } else {
                Alert.alert('Erro', 'Você não selecionou nenhum documento.');
            }
        } catch (error) {
            console.error('Erro ao selecionar documento:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao selecionar o documento.');
        }
    };

    const validateDate = (date) => {
        const regex = /^\d{2}\/\d{2}\/\d{4}$/; // Formato: DD/MM/YYYY
        return regex.test(date);
    };

    const handleUpload = async () => {
        if (!documentName || !category || !expiryDate || !fileUri) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        if (!validateDate(expiryDate)) {
            Alert.alert('Erro', 'Por favor, insira uma data de validade válida no formato DD/MM/YYYY.');
            return;
        }

        setLoading(true);
        const dirUri = `${FileSystem.documentDirectory}DocumentBox/`;

        try {
            // Cria o diretório se não existir
            await FileSystem.makeDirectoryAsync(dirUri, { intermediates: true });
            const sanitizedDocumentName = documentName.replace(/[<>:"/\\|?*]+/g, '');
            const newFileUri = `${dirUri}${sanitizedDocumentName}.pdf`;

            // Move o arquivo selecionado para o diretório do app
            await FileSystem.moveAsync({
                from: fileUri,
                to: newFileUri,
            });

            // Limpa os campos
            setDocumentName('');
            setCategory('');
            setExpiryDate('');
            setDescription('');
            setFileUri(null);

            // Exibir mensagem de sucesso
            setSuccessMessageVisible(true);
            setTimeout(() => {
                setSuccessMessageVisible(false);
                navigation.navigate('Dashboard'); // Navega de volta ao Dashboard
            }, 2000);
        } catch (error) {
            console.error('Erro ao salvar documento:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao salvar o documento.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Upload de Documentos</Text>

            <TextInput
                style={styles.input}
                placeholder="Nome do Documento"
                value={documentName}
                onChangeText={setDocumentName}
                autoCapitalize="words"
            />

            <Picker
                selectedValue={category}
                style={styles.picker}
                onValueChange={(itemValue) => setCategory(itemValue)}
            >
                <Picker.Item label="Selecione uma Categoria" value="" />
                {categories.map((cat, index) => (
                    <Picker.Item key={index} label={cat.name} value={cat.name} />
                ))}
            </Picker>

            <TextInput
                style={styles.input}
                placeholder="Data de Validade (DD/MM/YYYY)"
                value={expiryDate}
                onChangeText={setExpiryDate}
                keyboardType="numeric"
            />

            <TextInput
                style={styles.input}
                placeholder="Descrição (opcional)"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={3}
            />

            <TouchableOpacity style={styles.documentPickerButton} onPress={handleDocumentPick}>
                <Text style={styles.documentPickerText}>
                    {fileUri ? 'Documento Selecionado' : 'Selecionar Documento'}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.uploadButton}
                onPress={handleUpload}
                disabled={loading}
            >
                <Text style={styles.uploadButtonText}>
                    {loading ? <ActivityIndicator color="#fff" /> : 'Upload'}
                </Text>
            </TouchableOpacity>

            {successMessageVisible && (
                <View style={styles.successMessage}>
                    <Ionicons name="checkmark-circle" size={24} color="green" />
                    <Text style={styles.successText}>Documento salvo com sucesso!</Text>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#333',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    picker: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    documentPickerButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 15,
    },
    documentPickerText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    uploadButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    uploadButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    successMessage: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    successText: {
        marginLeft: 10,
        color: 'green',
    },
});
