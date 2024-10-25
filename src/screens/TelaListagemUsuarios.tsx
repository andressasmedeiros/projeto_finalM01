import React, { useEffect, useState } from 'react';
import { Alert, View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { UsuarioProps } from '../../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import Usuario from '../components/Usuario';
import { useIsFocused } from '@react-navigation/native';

type TelaListagemUsuariosNavigationProp = StackNavigationProp<RootStackParamList, 'TelaListagemUsuarios'>;

interface Props {
    navigation: TelaListagemUsuariosNavigationProp;
}

const TelaListagemUsuarios: React.FC<Props> = ({ navigation }) => {
    const [users, setUsers] = useState<UsuarioProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const isFocused = useIsFocused();


    const loadData = async () => {
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
       if (isFocused){
        loadData();
       }
    }, [isFocused]);

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
                <View style={styles.container}>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={handleCadastro}>
                            <Text style={styles.buttonText}>Novo Usuário</Text>
                        </TouchableOpacity>
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
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={2}
                        columnWrapperStyle={styles.row} 
                    />
                </View>
            )}
        </>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 10,
        backgroundColor: '#B0BEC5'
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 20,
        marginTop: 15,
        marginRight: 15  
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
      row: {
        justifyContent: 'space-between',
    },
});




export default TelaListagemUsuarios;