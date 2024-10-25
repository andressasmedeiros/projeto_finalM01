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
import { Filial } from './types';


export type RootStackParamList = {
  TelaLogin: undefined;
  TelaHome: undefined;
  TelaListagemProdutos: undefined;
  TelaListagemUsuarios: undefined;
  TelaCadastroUsuarios: undefined;
  TelaCadastroMovimentacao: undefined;
  TelaListagemMovimentacao: undefined;
  TelaMovimentacaoMotorista: undefined;
  TelaMapa: {origem:Filial, destino:Filial};
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TelaListagemMovimentacao">
        <Stack.Screen name="TelaLogin" component={TelaLogin} options={{ title: 'Login' }}/>
        <Stack.Screen name="TelaHome" component={TelaHome} options={{ title: 'Gerenciador' }} />
        <Stack.Screen name="TelaListagemProdutos" component={TelaListagemProdutos} options={{ title: 'Produtos' }}/>
        <Stack.Screen name="TelaListagemUsuarios" component={TelaListagemUsuarios} options={{ title: 'Usuários' }}/>
        <Stack.Screen name="TelaCadastroUsuarios" component={TelaCadastroUsuarios} options={{ title: 'Cadastro' }}/>
        <Stack.Screen name="TelaCadastroMovimentacao" component={TelaCadastroMovimentacao} options={{ title: 'Cadastro' }}/>
        <Stack.Screen name="TelaListagemMovimentacao" component={TelaListagemMovimentacao} options={{ title: 'Movimentações' }}/>
        <Stack.Screen name="TelaMovimentacaoMotorista" component={TelaMovimentacaoMotorista} />
        <Stack.Screen name="TelaMapa" component={TelaMapa} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
