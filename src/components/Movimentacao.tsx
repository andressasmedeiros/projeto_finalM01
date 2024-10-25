import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MovimentacaoProps } from '../../types';

const Movimentacao: React.FC<MovimentacaoProps> = ({ origem, destino, produto, status, quantidade }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Origem</Text>
      <Text style={styles.text}>Nome: {origem.nome}</Text>
      <Text style={styles.text}>Endereço: {origem.latitude}, {origem.longitude}</Text>

      <Text style={styles.sectionTitle}>Destino</Text>
      <Text style={styles.text}>Nome: {destino.nome}</Text>
      <Text style={styles.text}>Endereço: {destino.latitude}, {destino.longitude}</Text>

      <Text style={styles.sectionTitle}>Produto</Text>
      <Text style={styles.text}>Nome: {produto.nome}</Text>
      <Text style={styles.text}>Quantidade: {quantidade}</Text>

      <Text style={styles.statusText}>Status: {status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: '#333',
  },
  text: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginTop: 10,
  },
});

export default Movimentacao;
