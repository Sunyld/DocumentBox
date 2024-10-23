import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';

export default function CategoryScreen({ route, navigation }) {
    const { category, documents } = route.params || {}; // Recebe a categoria e documentos
    const [filteredDocuments, setFilteredDocuments] = useState([]);

    useEffect(() => {
        if (category && documents) {
            // Filtra os documentos da categoria selecionada
            const filtered = documents.filter(doc => doc.category === category);
            setFilteredDocuments(filtered); // Atualiza a lista de documentos filtrados
        } else {
            Alert.alert('Erro', 'Nenhuma categoria ou lista de documentos fornecida.');
        }
    }, [category, documents]);

    const handleDocumentPress = (document) => {
        // Navega para a tela de detalhes do documento
        navigation.navigate('DocumentDetails', { document });
    };

    const renderDocumentItem = ({ item }) => (
        <TouchableOpacity style={styles.documentItem} onPress={() => handleDocumentPress(item)}>
            <Text style={styles.documentTitle}>{item.name}</Text>
            <Text style={styles.documentDate}>Válido até: {item.expirationDate || 'Sem data'}</Text> {/* Exibe a data de validade, se houver */}
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Documentos em: {category}</Text>
            {filteredDocuments.length > 0 ? (
                <FlatList
                    data={filteredDocuments}
                    renderItem={renderDocumentItem}
                    keyExtractor={(item) => item.id.toString()} // Garante que o ID é único
                    showsVerticalScrollIndicator={false} // Remove o indicador de rolagem vertical
                    contentContainerStyle={styles.listContent}
                />
            ) : (
                <Text style={styles.noDocumentsText}>Nenhum documento encontrado nesta categoria.</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    noDocumentsText: {
        fontSize: 16,
        color: '#777',
        textAlign: 'center',
        marginTop: 20,
    },
    listContent: {
        paddingBottom: 40,
    },
    documentItem: {
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    documentTitle: {
        fontSize: 18,
        color: '#444',
        fontWeight: '500',
    },
    documentDate: {
        fontSize: 14,
        color: '#888',
        fontStyle: 'italic',
    },
});
