import { useEffect, useState } from "react";
import { MovimentacaoMotoristaProps, NavigationProps } from "../../types";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";
import { Alert, Button, FlatList, View, Text} from "react-native";
import MovimentacaoMotorista from "../components/MovimentacaoMotorista";

const TelaMovimentacaoMotorista = () => {
    const navigation = useNavigation<NavigationProps['navigation']>();
    const [movements, setMovements] = useState<MovimentacaoMotoristaProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [status, requestPermission] = ImagePicker.useCameraPermissions();

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

    useEffect(() => {
        handleMovements();
        requestPermission();        
    }, []);

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
                        <Button title="Logout" onPress={handleLogout} />
                    </View>
                    <FlatList
                        data={movements}
                        renderItem={({ item }) => (
                            <>
                                <MovimentacaoMotorista
                                    id={item.id}
                                    quantidade={item.quantidade}
                                    origem={item.origem}
                                    historico={item.historico}
                                    destino={item.destino}
                                    produto={item.produto}
                                    status={item.status}
                                    atualizarLista={handleMovements}
                                />
                                <Text>____________________________________________</Text>
                            </>
                        )}
                    />
                </View>

            )}
        </>

    )
};

export default TelaMovimentacaoMotorista;


