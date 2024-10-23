import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export default function Dashboard({ navigation }) {
    const [recentDocuments, setRecentDocuments] = useState([]); // Estado para armazenar documentos recentes
    const categories = [
        { name: 'Contratos', icon: 'document-text-outline' },
        { name: 'Pessoais', icon: 'person-outline' },
        { name: 'Faturas', icon: 'receipt-outline' },
        { name: 'Certificados', icon: 'school-outline' },
        { name: 'Receitas Médicas', icon: 'medkit-outline' },
        { name: 'Outros', icon: 'folder-outline' },
    ];

    useEffect(() => {
        // Aqui você pode carregar documentos armazenados, se necessário
    }, []);

    const openImagePicker = async () => {
        const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
        const galleryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (cameraPermission.granted === false) {
            Alert.alert("Acesso Negado", "É necessário permitir o acesso à câmera!");
            return;
        }
        
        if (galleryPermission.granted === false) {
            Alert.alert("Acesso Negado", "É necessário permitir o acesso à galeria!");
            return;
        }

        const result = await ImagePicker.launchCameraAsync();

        if (!result.cancelled) {
            const dirUri = FileSystem.documentDirectory + 'DocumentBox/';
            try {
                await FileSystem.makeDirectoryAsync(dirUri, { intermediates: true });
            } catch (error) {
                if (error.code !== 'EEXIST') {
                    console.error("Erro ao criar diretório:", error);
                    Alert.alert("Erro", "Erro ao criar diretório. Tente novamente.");
                    return;
                }
            }
            const fileName = `document_${Date.now()}.jpg`;
            const fileUri = dirUri + fileName;

            try {
                await FileSystem.moveAsync({
                    from: result.uri,
                    to: fileUri,
                });
                console.log('Imagem salva em:', fileUri);
                Alert.alert("Sucesso", "Imagem salva com sucesso!");

                // Adiciona o documento escaneado à lista de documentos recentes
                setRecentDocuments((prevDocs) => [
                    ...prevDocs,
                    { name: fileName, expiryDate: 'N/A', category: 'Outros', image: fileUri },
                ]);
            } catch (error) {
                console.error("Erro ao salvar a imagem:", error);
                Alert.alert("Erro", "Erro ao salvar a imagem. Tente novamente.");
            }
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                    <Ionicons name="menu" size={30} color="#007AFF" />
                </TouchableOpacity>
                <View style={styles.searchContainer}>
                    <Ionicons name="search-outline" size={20} color="#999" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Pesquisar..."
                        placeholderTextColor="#999"
                    />
                </View>
                <TouchableOpacity onPress={() => console.log('Notificações pressionadas')}>
                    <Ionicons name="notifications-outline" size={30} color="#007AFF" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={[{ key: 'Categorias' }, ...categories, { key: 'Documentos Recentes' }, ...recentDocuments]}
                renderItem={({ item }) => {
                    if (item.key === 'Categorias') {
                        return (
                            <>
                                <Text style={styles.title}>{item.key}</Text>
                                <View style={styles.categories}>
                                    {categories.map((category, index) => (
                                        <TouchableOpacity 
                                            key={index} 
                                            style={styles.category} 
                                            onPress={() => navigation.navigate('CategoryScreen', { category: category.name })}
                                        >
                                            <Ionicons name={category.icon} size={30} color="#007AFF" />
                                            <Text style={styles.categoryText}>{category.name}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </>
                        );
                    } else if (item.key === 'Documentos Recentes') {
                        return (
                            <>
                                <Text style={styles.title}>{item.key}</Text>
                                {recentDocuments.length > 0 ? (
                                    <FlatList
                                        data={recentDocuments}
                                        keyExtractor={(doc) => doc.name}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity
                                                style={styles.document}
                                                onPress={() => navigation.navigate('DocumentDetails', { document: item })}
                                            >
                                                <Text style={styles.documentText}>{item.name}</Text>
                                                <Text style={styles.documentDate}>{item.expiryDate}</Text>
                                            </TouchableOpacity>
                                        )}
                                    />
                                ) : (
                                    <Text style={styles.noDocuments}>Nenhum documento recente encontrado.</Text>
                                )}
                                <TouchableOpacity 
                                    style={styles.viewAllButton}
                                    onPress={() => navigation.navigate('AllDocuments')}
                                >
                                    <Text style={styles.viewAllText}>Ver Todos os Documentos</Text>
                                </TouchableOpacity>
                            </>
                        );
                    }
                    return null;
                }}
                keyExtractor={(item, index) => index.toString()}
            />

            <TouchableOpacity 
                style={styles.cameraButton} 
                onPress={openImagePicker}
            >
                <Ionicons name="camera" size={32} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.addButton} 
                onPress={() => navigation.navigate('Upload', { categories })}
            >
                <Ionicons name="add" size={32} color="#fff" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
        marginHorizontal: 10,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    searchIcon: {
        paddingHorizontal: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
        color: '#333',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#333',
    },
    categories: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    category: {
        width: '48%',
        padding: 20,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    categoryText: {
        textAlign: 'center',
        marginTop: 10,
        color: '#007AFF',
        fontWeight: '500',
    },
    document: {
        backgroundColor: '#fff',
        padding: 20,
        marginBottom: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    documentText: {
        fontSize: 16,
        color: '#333',
    },
    documentDate: {
        fontSize: 12,
        color: '#999',
        marginTop: 5,
    },
    cameraButton: {
        position: 'absolute',
        bottom: 100,
        right: 20,
        backgroundColor: '#007AFF',
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 4,
        zIndex: 100,
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#007AFF',
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 4,
        zIndex: 100,
    },
    viewAllButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#007AFF',
        borderRadius: 5,
        alignItems: 'center',
    },
    viewAllText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    noDocuments: {
        textAlign: 'center',
        color: '#999',
        marginTop: 10,
    },
});
