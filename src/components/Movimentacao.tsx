import { View, Text} from 'react-native';
import { MovimentacaoProps} from '../../types';


const Movimentacao: React.FC<MovimentacaoProps> = ({ origem, destino, produto, status, quantidade}) => {



  return (
      <View>
        <Text>{origem.nome}</Text>
        <Text>{origem.latitude}, {origem.longitude}</Text>
        <Text>{destino.nome}</Text>
        <Text>{destino.latitude}, {origem.longitude}</Text>
        <Text>{produto.nome}, {quantidade}</Text>
        <Text>{status}</Text>
      </View>
  );
};


export default Movimentacao;