import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Importação das telas
import Dashboard from '../screens/Dashboard';
import UploadScreen from '../screens/UploadScreen';
import DocumentDetails from '../screens/DocumentDetails';
import CategoryScreen from '../screens/CategoryScreen'; // Certifique-se de que o nome do arquivo está correto

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Navegação do Stack para o Dashboard
function DashboardStack() {
  return (
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen 
        name="Dashboard" 
        component={Dashboard} 
        options={{ headerShown: false }} // Oculta o cabeçalho da tela de Dashboard
      />
      <Stack.Screen 
        name="Upload" 
        component={UploadScreen} 
        options={{ title: 'Adicionar Documento' }} // Título personalizado
      />
      <Stack.Screen 
        name="DocumentDetails" 
        component={DocumentDetails} 
        options={{ title: 'Detalhes do Documento' }} // Título personalizado
      />
      <Stack.Screen 
        name="Category" // Certifique-se de que este nome corresponde ao que você usa para navegar
        component={CategoryScreen} 
        options={{ title: 'Categorias' }} // Título personalizado
      />
    </Stack.Navigator>
  );
}

// Navegação principal com Tabs
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Dashboard') {
              iconName = 'home-outline';
            } else if (route.name === 'Upload') {
              iconName = 'cloud-upload-outline';
            } else if (route.name === 'RecentDocs') {
              iconName = 'document-text-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#007AFF',
          inactiveTintColor: 'gray',
          style: {
            borderTopWidth: 1,
            borderTopColor: '#ccc',
            height: 60, // Altura personalizada
          },
          labelStyle: {
            fontSize: 12, // Tamanho personalizado do texto
          },
        }}
      >
        <Tab.Screen name="Dashboard" component={DashboardStack} />
        <Tab.Screen name="Upload" component={UploadScreen} options={{ headerShown: false }} />
        <Tab.Screen name="RecentDocs" component={DocumentDetails} options={{ title: 'Recentes' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
