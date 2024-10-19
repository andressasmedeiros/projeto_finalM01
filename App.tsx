import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TelaLogin from './src/screens/TelaLogin';
import TelaHome from './src/screens/TelaHome';
import TelaListagemProdutos from './src/screens/TelaListagemProdutos';


export type RootStackParamList = {
  TelaLogin: undefined;
  TelaHome: undefined;
  TelaListagemProdutos: undefined;
  TelaListagemUsuarios: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TelaHome">
        <Stack.Screen name="TelaLogin" component={TelaLogin} />
        <Stack.Screen name="TelaHome" component={TelaHome} />
        <Stack.Screen name="TelaListagemProdutos" component={TelaListagemProdutos} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
