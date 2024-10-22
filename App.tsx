import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TelaLogin from './src/screens/TelaLogin';
import TelaHome from './src/screens/TelaHome';
import TelaListagemProdutos from './src/screens/TelaListagemProdutos';
import TelaListagemUsuarios from './src/screens/TelaListagemUsuarios';
import TelaCadastroUsuarios from './src/screens/TelaCadastroUsuarios';
import TelaCadastroMovimentacao from './src/screens/TelaCadastroMovimentacao';
import TelaListagemMovimentacao from './src/screens/TelaListagemMovimentacao';


export type RootStackParamList = {
  TelaLogin: undefined;
  TelaHome: undefined;
  TelaListagemProdutos: undefined;
  TelaListagemUsuarios: undefined;
  TelaCadastroUsuarios: undefined;
  TelaCadastroMovimentacao: undefined;
  TelaListagemMovimentacao: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TelaHome">
        <Stack.Screen name="TelaLogin" component={TelaLogin} />
        <Stack.Screen name="TelaHome" component={TelaHome} />
        <Stack.Screen name="TelaListagemProdutos" component={TelaListagemProdutos} />
        <Stack.Screen name="TelaListagemUsuarios" component={TelaListagemUsuarios} />
        <Stack.Screen name="TelaCadastroUsuarios" component={TelaCadastroUsuarios} />
        <Stack.Screen name="TelaCadastroMovimentacao" component={TelaCadastroMovimentacao} />
        <Stack.Screen name="TelaListagemMovimentacao" component={TelaListagemMovimentacao} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
