import { useNavigation } from '@react-navigation/native';
import { MovimentacaoMotoristaProps, NavigationProps } from '../../types';
import * as ImagePicker from 'expo-image-picker';
import { Button, View, Text, Image, StyleSheet, FlatList } from "react-native";
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
            .catch(error => console.log(error.toJSON()))

    };


    const handleMapa = () => {
        navigation.navigate('TelaMapa', { origem, destino });
    };

    return (
        <View>
            <Text>Origem: {origem.nome}</Text>
            <Text>Destino: {destino.nome}</Text>
            <Image source={{ uri: produto.imagem }} style={styles.image} />
            <Text>{produto.nome}, {quantidade}</Text>

            <FlatList
                data={historico}
                renderItem={({ item }) => (
                    <Text>
                        - {item.descricao}
                        - {item.data}
                    </Text>
                )}
            />

            {status === 'created' ?
                (
                    <View>
                        <Text>Aguardando Coleta</Text>
                        <Button title="Iniciar Entrega" onPress={() => pickImage(true)} />
                        <Button title="Mapa" onPress={handleMapa} />
                    </View>
                ) : null}
            {status === 'em transito' ?
                (
                    <View>
                        <Button title="Finalizar Entrega" onPress={() => pickImage(false)} />
                        <Button title="Mapa" onPress={handleMapa} />
                    </View>
                ) : null}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 200,
        height: 200,
    },

});

export default MovimentacaoMotorista;