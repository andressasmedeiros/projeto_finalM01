// types.d.ts
import { RouteProp } from '@react-navigation/native';

export type RootParamList = {
  TelaHome: undefined; // Defina a rota TelaHome
  TelaLogin: undefined; // Defina a rota TelaLogin
  // Adicione outras rotas aqui conforme necessário
};

export type NavigationProps = {
  navigation: {
    reset: (state: { index: number; routes: Array<{ name: keyof RootParamList }> }) => void;
    // Adicione outras propriedades de navegação conforme necessário
  };
  route: RouteProp<RootParamList, keyof RootParamList>;
};

export type ProdutoProps = {
  product_name: string;
  branch_name: string;
  description: string;
  image_url: string;
  quantity: number;
  key: number;
}