import { useEffect, useState } from "react";
import { MovimentacaoProps } from "../../types";
import { Button, View, Text, FlatList, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
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
                console.log(response.data)
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
            console.error(error);
        }
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
                <View>

                    <View>
                        <Button title="Nova Movimentação" onPress={handleCadastro} />
                    </View>
                    <View>
                        <Button title="Logout" onPress={handleLogout} />
                    </View>

                    <FlatList
                        data={movements}
                        renderItem={({ item }) => (
                            <Movimentacao
                                origem={item.origem}
                                destino={item.destino}
                                produto={item.produto}
                                status={item.status}
                            />

                        )}
                    />

                </View>

            )}
        </>

    )


}
export default TelaListagemMovimentacao;