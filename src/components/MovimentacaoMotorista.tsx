import { useNavigation } from '@react-navigation/native';
import { MovimentacaoMotoristaProps, NavigationProps } from '../../types';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Button, View, Text, Image, StyleSheet, FlatList } from "react-native";



const MovimentacaoMotorista: React.FC<MovimentacaoMotoristaProps> = ({ origem, destino, produto, status, historico }) => {
    const navigation = useNavigation<NavigationProps['navigation']>();
    const [image, setImage] = useState<string | null>(null);

    const pickImage = async () => {
        const result = await ImagePicker.launchCameraAsync();

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }

    const handleMapa = () => {
        navigation.navigate('TelaMapa', { origem, destino });
    };

    return (
        <View>
            <Text>{origem.nome}</Text>
            <Text>{origem.latitude}, {origem.longitude}</Text>
            <Text>{destino.latitude}, {destino.longitude}</Text>
            <Image source={{ uri: produto.imagem }} style={styles.image} />
            <Text>{produto.nome}, {produto.quantidade}</Text>
            <Text>{status}</Text>

            <FlatList
                data={historico}
                renderItem={({ item }) => (
                    <Text>
                       - {item.descricao}
                    </Text>
                )}
            />

            {status === 'created' ?
                (
                    <View>
                        <Button title="Iniciar Entrega" onPress={pickImage} />
                        {image && <Image source={{ uri: image }} style={styles.image} />}
                        <Button title="Mapa" onPress={handleMapa} />
                    </View>
                ) : null}
            {status === 'Em trânsito' ?
                (
                    <View>
                        <Button title="Finalizar Entrega" onPress={pickImage} />
                        {image && <Image source={{ uri: image }} style={styles.image} />}
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