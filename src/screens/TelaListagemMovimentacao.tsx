import { useEffect, useState } from "react";
import { MovimentacaoProps } from "../../types";
import { Button, View, Text, FlatList, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";
import Movimentacao from "../components/Movimentacao";
import axios from "axios";


type TelaListagemMovimentacaoNavigationProp = StackNavigationProp<RootStackParamList, 'TelaListagemMovimentacao'>;

interface Props {
  navigation: TelaListagemMovimentacaoNavigationProp;
}

const TelaListagemMovimentacao: React.FC<Props> = ({ navigation }) => {
  const [movements, setMovements] = useState<MovimentacaoProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleMovements = async () => {
    try {
      const response = await axios.get('http://192.168.16.105:3000/movements');
      if (response.status === 200) {
        const responseData = response.data;
        for (var i = 0; i < responseData.length; i++) {
          responseData[i].key = i;
        }
        setMovements(response.data);
        setIsLoading(false);
      } else {
        Alert.alert('Movimentações não encontradas');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao carregar as movimentações');
    }
  };

  const mapStatus = (status: string) => {
    if ('created' === status) {
      return 'Aguardando Coleta';
    }
    return status;
  }

  const html = `
    <html>
      <head>
        <style>
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
        <h1>Relatório de Movimentações</h1>
        <table>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Status</th>
              <th>Origem</th>
              <th>Destino</th>
            </tr>
          </thead>
          <tbody>
            ${movements.map(item => `
              <tr>
                <td>${item.produto.nome}</td>
                <td>${item.quantidade}</td>
                <td>${mapStatus(item.status)}</td>
                <td>${item.origem.nome}</td>
                <td>${item.destino.nome}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </body>
    </html>
    `;

  const generatePdf = async () => {
    const file = await printToFileAsync({
      html: html,
      base64: false
    });

    await shareAsync(file.uri);
  };

  useEffect(() => {
    handleMovements();
  }, []);

  const handleCadastro = () => {
    navigation.navigate('TelaCadastroMovimentacao');
  };

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'TelaLogin' }],
    });
  };

  return (
    <>
      {isLoading ? (
        <View>
          <Text>Carregando</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={generatePdf}>
              <Text style={styles.buttonText}>Gerar relatório PDF</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleCadastro}>
              <Text style={styles.buttonText}>Nova Movimentação</Text>
            </TouchableOpacity>
          </View>
  
          <FlatList
            data={movements}
            renderItem={({ item }) => (
              <Movimentacao
                origem={item.origem}
                quantidade={item.quantidade}
                destino={item.destino}
                produto={item.produto}
                status={mapStatus(item.status)}
              />
            )}
          />
  
          <View style={styles.footerButtons}>
            <TouchableOpacity style={styles.buttonLogout} onPress={handleLogout}>
              <Text style={styles.buttonLogoutText}>Sair</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
}

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#B0BEC5',
    padding: 10,
    flex: 1
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 15,
    marginRight: 15,
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: -10, 
    paddingVertical: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#2E7D32',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  buttonLogout: {
    marginTop: 20,
  },
  buttonLogoutText: {
    color: '#2E7D32',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
export default TelaListagemMovimentacao;