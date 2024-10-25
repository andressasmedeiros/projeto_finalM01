import { useNavigation } from '@react-navigation/native';
import { MovimentacaoMotoristaProps, NavigationProps } from '../../types';
import * as ImagePicker from 'expo-image-picker';
import { Button, View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const MovimentacaoMotorista: React.FC<MovimentacaoMotoristaProps> = ({ id, origem, destino, produto, status, historico, quantidade, atualizarLista }) => {
    const navigation = useNavigation<NavigationProps['navigation']>();

    const pickImage = async (isStart: boolean) => {
        const result = await ImagePicker.launchCameraAsync();

        if (!result.canceled) {
            const selectedImage = result.assets[0];
            await uploadImage(selectedImage, isStart);
        }
    };

    const uploadImage = async (image: ImagePicker.ImagePickerAsset, isStart: boolean) => {
        const user = await AsyncStorage.getItem('user');
        const userData = JSON.parse(user || '{}');
        const formData = new FormData();
        formData.append('file', {
            uri: image.uri,
            type: image.mimeType as string,
            name: image.fileName as string,
        });
        formData.append('motorista', userData.name);
        const path = isStart ? 'start' : 'end';
        axios.put(`http://192.168.16.105:3000/movements/${id}/${path}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(() => atualizarLista())
            .catch(error => console.log(error.toJSON()));
    };

    const handleMapa = () => {
        navigation.navigate('TelaMapa', { origem, destino });
    };

    const renomearStatusHistorico = (descricao: string) => {
        if (!descricao) {
            return '';
        }
        return descricao.replace('created', 'Aguardando Coleta');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Origem: {origem.nome}</Text>
            <Text style={styles.text}>Destino: {destino.nome}</Text>
            <View style={styles.imageContainer}>
                <Image source={{ uri: produto.imagem }} style={styles.image} />
            </View>
            <View style={styles.row}>
                <Text style={styles.storeName}>Produto: {produto.nome}</Text>
                <Text style={styles.quantityText}>Quantidade: {quantidade}</Text>
            </View>
            <FlatList
                style={styles.description}
                data={historico}
                renderItem={({ item }) => (
                    <View style={styles.descriptionList}>
                        <Text>
                            - {renomearStatusHistorico(item.descricao)} - {item.data}
                        </Text>
                    </View>
                )}
            />

            {status === 'created' ? (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => pickImage(true)} style={styles.button}>
                        <Text style={styles.buttonText}>Iniciar Entrega</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleMapa}>
                        <Text style={styles.buttonText}>Ver Rota</Text>
                    </TouchableOpacity>
                </View>
            ) : null}
            {status === 'em transito' ? (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => pickImage(false)} style={styles.button}>
                        <Text style={styles.buttonText}>Finalizar Entrega</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleMapa}>
                        <Text style={styles.buttonText}>Ver Rota</Text>
                    </TouchableOpacity>
                </View>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        justifyContent: 'center',
    },
    itemName: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#2E7D32',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginVertical: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    text: {
        fontSize: 16,
        color: '#555',
        marginBottom: 5,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 10,
    },
    quantityText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginVertical: 5,
    },
    description: {
        fontSize: 14,
        color: '#888',
        marginTop: 5,
        textAlign: 'center',
    },
    storeName: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    descriptionList: {
        borderColor: '#B0BEC5',
        borderWidth: 1,
        borderRadius: 5,
        padding: 3,
        marginBottom: 5,
    }
});

export default MovimentacaoMotorista;
