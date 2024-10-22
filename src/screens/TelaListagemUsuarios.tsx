import React, { useEffect, useState } from 'react';
import { Alert, View, Button, StyleSheet, FlatList, Text } from 'react-native';
import axios from 'axios';
import { UsuarioProps } from '../../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { useNavigation } from '@react-navigation/native';
import Usuario from '../components/Usuario';

type TelaListagemUsuariosNavigationProp = StackNavigationProp<RootStackParamList, 'TelaListagemUsuarios'>;

interface Props {
    navigation: TelaListagemUsuariosNavigationProp;
}

const TelaListagemUsuarios: React.FC<Props> = ({ navigation }) => {
    const [users, setUsers] = useState<UsuarioProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);


    const handleUsers = async () => {
        try {
            const response = await axios.get('http://192.168.16.105:3000/users');
            if (response.status === 200) {
                const responseData = response.data;
                for (var i = 0; i < responseData.length; i++) {
                    responseData[i].key = i;
                }
                setUsers(response.data);
                setIsLoading(false);
            } else {
                Alert.alert('Usuários não encontrados');
            }
        } catch (error) {
            Alert.alert('Erro', 'Ocorreu um erro ao carregar os usuários');
            console.error(error);
        }
    };

    useEffect(() => {
        handleUsers();
    }, []);

    const handleCadastro = () => {
        navigation.navigate('TelaCadastroUsuarios');
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
                        <Button title="Novo Usuario" onPress={handleCadastro} />
                    </View>

                    <FlatList
                        data={users}
                        renderItem={({ item }) => (
                            <Usuario
                                id={item.id}
                                profile={item.profile}
                                name={item.name}
                                status={item.status}
                            />
                        )}
                    />
                </View>
            )}
        </>
    );

}

const styles = StyleSheet.create({
    
});




export default TelaListagemUsuarios;