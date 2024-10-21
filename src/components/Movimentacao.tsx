import { View, Text} from 'react-native';
import { MovimentacaoProps} from '../../types';


const Movimentacao: React.FC<MovimentacaoProps> = ({ origem, destino, produto, status}) => {



  return (
      <View>
        <Text>{origem.nome}</Text>
        <Text>{origem.latitude}, {origem.longitude}</Text>
        <Text>{destino.latitude}, {origem.longitude}</Text>
        <Text>{produto.nome}, {produto.quantidade}</Text>
        <Text>{status}</Text>
      </View>
  );
};


export default Movimentacao;