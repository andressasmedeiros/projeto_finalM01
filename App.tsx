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
import TelaMovimentacaoMotorista from './src/screens/TelaMovimentacaoMotorista';
import TelaMapa from './src/screens/TelaMapa';


export type RootStackParamList = {
  TelaLogin: undefined;
  TelaHome: undefined;
  TelaListagemProdutos: undefined;
  TelaListagemUsuarios: undefined;
  TelaCadastroUsuarios: undefined;
  TelaCadastroMovimentacao: undefined;
  TelaListagemMovimentacao: undefined;
  TelaMovimentacaoMotorista: undefined;
  TelaMapa: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TelaMovimentacaoMotorista">
        <Stack.Screen name="TelaLogin" component={TelaLogin} />
        <Stack.Screen name="TelaHome" component={TelaHome} />
        <Stack.Screen name="TelaListagemProdutos" component={TelaListagemProdutos} />
        <Stack.Screen name="TelaListagemUsuarios" component={TelaListagemUsuarios} />
        <Stack.Screen name="TelaCadastroUsuarios" component={TelaCadastroUsuarios} />
        <Stack.Screen name="TelaCadastroMovimentacao" component={TelaCadastroMovimentacao} />
        <Stack.Screen name="TelaListagemMovimentacao" component={TelaListagemMovimentacao} />
        <Stack.Screen name="TelaMovimentacaoMotorista" component={TelaMovimentacaoMotorista} />
        <Stack.Screen name="TelaMapa" component={TelaMapa} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
