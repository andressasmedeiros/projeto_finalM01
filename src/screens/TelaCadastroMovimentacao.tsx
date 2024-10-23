import React, { useState, useEffect } from 'react';
import { Alert, Button, ScrollView, TextInput, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { Branch, Product } from '../../types';
import { Picker } from '@react-native-picker/picker';

const TelaCadastroMovimentacao = () => {
    const [originBranch, setOriginBranch] = useState<number | null>(null);
    const [destinationBranch, setDestinationBranch] = useState<number | null>(null);
    const [productId, setProductId] = useState<number | null>(null);
    const [quantity, setQuantity] = useState<number>(0);
    const [note, setNote] = useState<string>('');

    const [branches, setBranches] = useState<Branch[]>([]);
    const [products, setProducts] = useState<Product[]>([]);


    useEffect(() => {
        fetchBranches();
        fetchProducts();
    }, []);

    const fetchBranches = async () => {
        try {
            const { data } = await axios.get('http://192.168.16.105:3000/branches/options', {
            });
            if (Array.isArray(data)) {
                setBranches(data);
            }
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível carregar as filiais');
        }
    };

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('http://192.168.16.105:3000/products/options', {
            });
            if (Array.isArray(data)) {
                setProducts(data);
            }
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível carregar os produtos');
        }
    };

    function handleOriginBranchChange(itemValue: React.SetStateAction<number | null>) {
        setOriginBranch(itemValue);
        setProductId(null);
    }

    function getFilteredProducts() {
        const branchesFound = branches.filter(b =>
            b.id === originBranch
        )
        if (!branchesFound) {
            return products;
        }
        const branch = branchesFound[0]
        return products.filter((product) => {
            return product.branch_name.toLowerCase().includes(branch?.name?.toLowerCase())
        }
        );
    }


    const handleSubmit = async () => {
        if (!originBranch || !destinationBranch || !productId) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        if (originBranch === destinationBranch) {
            Alert.alert('Erro', 'A filial de origem e destino não podem ser iguais.');
            return;
        }

        const selectedProduct = products.find(p => p.product_id === productId);
        if (selectedProduct && quantity > selectedProduct.quantity) {
            Alert.alert('Erro', 'A quantidade desejada é maior do que a disponível.');
            return;
        }

        try {
            const response = await axios.post('http://192.168.16.105:3000/movements', {
                originBranchId: originBranch,
                destinationBranchId: destinationBranch,
                productId: productId,
                quantity: quantity,
            });

            if (response.status === 201) {
                Alert.alert('Sucesso', 'Movimentação cadastrada com sucesso');
                setOriginBranch(null);
                setDestinationBranch(null);
                setProductId(null);
                setQuantity(0);
            } else {                
                Alert.alert('Erro', response.data.error || 'Erro ao cadastrar movimentação');
            }
        } catch (error) {
            Alert.alert('Erro', 'Erro ao realizar a movimentação.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>Filial de Origem</Text>
            <Picker
                selectedValue={originBranch}
                onValueChange={(itemValue: number | null) => handleOriginBranchChange(itemValue)}
                style={styles.picker}
            >

                <Picker.Item label="Selecione" value={null} />

                {Array.isArray(branches) && branches.length > 0 ? (
                    branches.map((branch) => (
                        <Picker.Item key={branch.id} label={branch.name} value={branch.id} />
                    ))
                ) : (
                    <Picker.Item label="Nenhuma filial disponível" value={null} />
                )}
            </Picker>

            <Text style={styles.label}>Filial de Destino</Text>
            <Picker
                selectedValue={destinationBranch}
                onValueChange={(itemValue: number | null) => setDestinationBranch(itemValue)}
                style={styles.picker}
            >

                <Picker.Item label="Selecione" value={null} />

                {Array.isArray(branches) && branches.length > 0 ? (
                    branches.map((branch) => (
                        <Picker.Item key={branch.id} label={branch.name} value={branch.id} />
                    ))
                ) : (
                    <Picker.Item label="Nenhuma filial disponível" value={null} />
                )}
            </Picker>

            <Text style={styles.label}>Produto</Text>
            <Picker
                selectedValue={productId}
                onValueChange={(itemValue: number | null) => setProductId(itemValue)}
                style={styles.picker}
            >

                <Picker.Item label="Selecione" value={null} />

                {Array.isArray(products) && products.length > 0 ? (
                    getFilteredProducts().map((prod) => (
                        <Picker.Item key={prod.product_id} label={prod.product_name} value={prod.product_id} />
                    ))
                ) : (
                    <Picker.Item label="Nenhum produto disponível" value={null} />
                )}
            </Picker>

            <Text style={styles.label}>Quantidade</Text>
            <TextInput
                value={String(quantity)}
                onChangeText={(text) => setQuantity(Number(text))}
                keyboardType="numeric"
                style={styles.input}
            />

            <Text style={styles.label}>Observações</Text>
            <TextInput
                value={note}
                onChangeText={setNote}
                multiline
                numberOfLines={4}
                style={styles.textArea}
            />

            <Button title="Cadastrar" onPress={handleSubmit} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 8,
    },
    picker: {
        height: 50,
        marginBottom: 16,
    },
    input: {
        borderColor: 'gray',
        borderWidth: 1,
        padding: 8,
        marginBottom: 16,
        borderRadius: 4,
    },
    textArea: {
        borderColor: 'gray',
        borderWidth: 1,
        padding: 8,
        marginBottom: 16,
        borderRadius: 4,
        height: 100,
        textAlignVertical: 'top',
    },
});

export default TelaCadastroMovimentacao;
