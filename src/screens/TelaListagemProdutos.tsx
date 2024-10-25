import React, { useEffect, useState } from 'react';
import { Alert, View, FlatList, Text, TextInput } from 'react-native';
import Produto from '../components/Produto';
import { StyleSheet } from 'react-native';
import axios from 'axios';
import { ProdutoProps } from '../../types';


const TelaListagemProdutos = () => {
    const [products, setProducts] = useState<ProdutoProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const handleProducts = async () => {
        try {
            const response = await axios.get('http://192.168.16.105:3000/products');
            if (response.status === 200) {
                const responseData = response.data;
                for (var i = 0; i < responseData.length; i++) {
                    responseData[i].key = i;
                }
                setProducts(response.data);
                setIsLoading(false);
            } else {
                Alert.alert('Produtos não encontrados');
            }
        } catch (error) {
            Alert.alert('Erro', 'Ocorreu um erro ao carregar os produtos');
            console.error(error);
        }
    };

    const filteredProducts = products.filter((product) =>
        product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) || product.branch_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        handleProducts();
    }, []);

    return (
        <>
            {isLoading ? (
                <View>
                    <Text>Carregando</Text>
                </View>
            ) : (
                <View style={styles.container}>
                    <TextInput
        placeholder="Buscar produtos ou loja..."
        autoCapitalize="sentences"
        keyboardType="default"
        value={searchTerm}
        onChangeText={setSearchTerm}
        style={styles.searchInput} // Aplicando o estilo ao TextInput
      />
      <Text style={styles.productCount}>
        {filteredProducts.length} Produtos encontrados
      </Text>

                    <FlatList
                        data={filteredProducts}
                        renderItem={({ item }) => (
                            <Produto 
                                key={item.key}
                                product_name={item.product_name}
                                branch_name={item.branch_name}
                                description={item.description}
                                quantity={item.quantity}
                                image_url={item.image_url}
                            />
                        )}
                        keyExtractor={(item) => item.key.toString()}
                    />
                </View>
            )}
        </>
    );








}


export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#B0BEC5',
        padding: 10,
    },
    searchInput: {
        backgroundColor: '#fff',
        borderRadius: 10, 
        padding: 10, 
        fontSize: 16, 
        marginBottom: 10, 
        elevation: 2, 
        shadowColor: '#000',
        shadowOpacity: 0.1, 
        shadowOffset: { width: 0, height: 2 }, 
        shadowRadius: 4,
      },
      productCount: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
      },
});

export default TelaListagemProdutos;