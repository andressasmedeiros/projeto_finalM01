// types.d.ts
import { RouteProp } from '@react-navigation/native';

export type NavigationProps = {
  navigation: {
    reset: (state: { index: number; routes: Array<{ name: keyof RootParamList }> }) => void;
    navigate: (name: keyof RootParamList, params?: any) => void;
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

export type LoginProps = {
  profile: string;
  name: string;
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
  product_name: string;
  quantity: number;
};

type Filial = {
  nome: string;
  latitude: number;
  longitude: number;
}

export type MovimentacaoProps = {
  origem: Filial;
  destino: Filial;
  quantidade: number;
  produto: {
    nome: string;
    imagem: string,
    quantidade: number;
  };
  status: string;
};

type HistoricoItem = {
  id: number;
  descricao: string;
  data: string;
  file: string;
};

export type MovimentacaoMotoristaProps = MovimentacaoProps & {
  id: number;
  historico: HistoricoItem[];
  atualizarLista: () => void;
};

