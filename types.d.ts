// types.d.ts
import { RouteProp } from '@react-navigation/native';

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
};

export type UsuarioProps = {
  id: number;
  profile: string;
  name: string;
  status: boolean;
};

export type CadastroProps = {
  name: string;
  document: string;
  email: string;
  full_address: string;
  password: string;
  setName: (value: string) => void;
  setDocument: (value: string) => void;
  setEmail: (value: string) => void;
  setFullAddress: (value: string) => void;
  setPassword: (value: string) => void;
};

interface Branch {
  name: string;
  id: number;
};

interface Product {
  product_id: number;
  branch_name: string;
  products_name: string;
  quantity: number;
};

export type MovimentacaoProps = {
  origem: {
    nome: string;
    latitude: number;
    longitude: number;
  };
  destino: {
    nome: string;
    latitude: number;
    longitude: number;
  };
  produto: {
    nome: string;
    quantidade: number;
  };
  status: string;
}