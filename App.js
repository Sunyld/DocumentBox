import 'react-native-gesture-handler'; // Importar o Gesture Handler
import React, { useEffect } from 'react';
import { StyleSheet, View, StatusBar as RNStatusBar } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen'; // Biblioteca para controlar splash screen
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons'; // Biblioteca para ícones

// Importação das telas
import Dashboard from './src/screens/Dashboard';
import UploadScreen from './src/screens/UploadScreen';
import DocumentDetails from './src/screens/DocumentDetails';
import BackupRestoreScreen from './src/screens/BackupRestoreScreen';
import PremiumScreen from './src/screens/PremiumScreen';
import AboutScreen from './src/screens/AboutScreen';
import TermsConditionsScreen from './src/screens/TermsConditionsScreen';
import DonateScreen from './src/screens/DonateScreen';
import ShareScreen from './src/screens/ShareScreen';
import LockScreen from './src/screens/LockScreen';
import CategoryScreen from './src/screens/CategoryScreen'; // Certifique-se que este componente existe

// Inicializando o Drawer Navigator
const Drawer = createDrawerNavigator();

export default function App() {
  useEffect(() => {
    const prepare = async () => {
      try {
        await SplashScreen.preventAutoHideAsync(); // Evitar que o splash screen desapareça automaticamente
        // Simular algum carregamento de recursos ou preparar algo
        setTimeout(async () => {
          await SplashScreen.hideAsync(); // Esconder o splash screen após 2 segundos
        }, 2000);
      } catch (e) {
        console.warn(e); // Tratar qualquer erro
      }
    };

    prepare();
  }, []);

  return (
    <NavigationContainer>
      {/* O container de navegação */}
      <Drawer.Navigator initialRouteName="Dashboard">
        <Drawer.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            title: 'DocumentBox',
            drawerIcon: () => <Ionicons name="home-outline" size={20} />,
          }}
        />
        <Drawer.Screen
          name="Upload"
          component={UploadScreen}
          options={{
            title: 'Upload de Documentos',
            drawerIcon: () => <Ionicons name="cloud-upload-outline" size={20} />,
          }}
        />
        <Drawer.Screen
          name="Category"
          component={CategoryScreen}
          options={{
            title: 'Categoria',
            drawerIcon: () => <Ionicons name="folder-outline" size={20} />,
          }}
        />
        <Drawer.Screen
          name="DocumentDetails"
          component={DocumentDetails}
          options={{
            title: 'Detalhes do Documento',
            drawerIcon: () => <Ionicons name="document-text-outline" size={20} />,
          }}
        />
        <Drawer.Screen
          name="Backup"
          component={BackupRestoreScreen}
          options={{
            title: 'Backup & Restauração',
            drawerIcon: () => <Ionicons name="cloud-download-outline" size={20} />,
          }}
        />
        <Drawer.Screen
          name="Premium"
          component={PremiumScreen}
          options={{
            title: 'Pacote Premium',
            drawerIcon: () => <Ionicons name="star-outline" size={20} />,
          }}
        />
        <Drawer.Screen
          name="About"
          component={AboutScreen}
          options={{
            title: 'Sobre o App',
            drawerIcon: () => <Ionicons name="information-circle-outline" size={20} />,
          }}
        />
        <Drawer.Screen
          name="Terms"
          component={TermsConditionsScreen}
          options={{
            title: 'Termos e Condições',
            drawerIcon: () => <Ionicons name="document-outline" size={20} />,
          }}
        />
        <Drawer.Screen
          name="Donate"
          component={DonateScreen}
          options={{
            title: 'Doar para o App',
            drawerIcon: () => <Ionicons name="heart-outline" size={20} />,
          }}
        />
        <Drawer.Screen
          name="Share"
          component={ShareScreen}
          options={{
            title: 'Enviar para Amigos',
            drawerIcon: () => <Ionicons name="share-outline" size={20} />,
          }}
        />
        <Drawer.Screen
          name="Lock"
          component={LockScreen}
          options={{
            title: 'Bloquear App',
            drawerIcon: () => <Ionicons name="lock-closed-outline" size={20} />,
          }}
        />
      </Drawer.Navigator>
      {/* Barra de status para manter o estilo claro */}
      <StatusBar style="auto" />
      <RNStatusBar backgroundColor="#ffffff" barStyle="dark-content" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
