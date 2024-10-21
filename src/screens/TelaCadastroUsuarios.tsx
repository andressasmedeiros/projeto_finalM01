import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Motorista from '../components/Motorista';
import Filial from '../components/Filial';
import { RootStackParamList } from '../../App';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';

type TelaCadastroUsuariosNavigationProp = StackNavigationProp<RootStackParamList, 'TelaCadastroUsuarios'>;

const TelaCadastroUsuarios = () => {
    const [selectedForm, setSelectedForm] = useState('motorista');
    const [loading, setLoading] = useState(false);

    // Campos do formulário
    const [name, setName] = useState('');
    const [document, setDocument] = useState('');
    const [email, setEmail] = useState('');
    const [full_address, setFullAddress] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        setName('');
        setDocument('');
        setEmail('');
        setFullAddress('');
        setPassword('');
    }, [selectedForm]);

    const validateForm = () => {
        if (!name || !document || !email || !full_address || !password) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return false;
        }
        return true;
    };

    const handleSubmit = () => {
        if (!validateForm()) return;

        const register = {
            name,
            document,
            email,
            full_address,
            password,
            profile: selectedForm,
        };

        setLoading(true);

        axios.post('http://192.168.16.105:3000/register', register)
            .then(() => {
                Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
                setName('');
                setDocument('');
                setEmail('');
                setFullAddress('');
                setPassword('');
            })
            .catch((error) => {
                console.error(error);
                Alert.alert('Erro', 'Ocorreu um erro ao cadastrar o usuário.');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Selecione o Tipo de Cadastro:</Text>

            <Picker
                selectedValue={selectedForm}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedForm(itemValue)}
            >
                <Picker.Item label="Selecione uma opção" value="" />
                <Picker.Item label="Motorista" value="motorista" />
                <Picker.Item label="Filial" value="filial" />
            </Picker>

            {selectedForm === 'motorista' && (
                <Motorista
                    name={name}
                    document={document}
                    email={email}
                    full_address={full_address}
                    password={password}
                    setName={setName}
                    setDocument={setDocument}
                    setEmail={setEmail}
                    setFullAddress={setFullAddress}
                    setPassword={setPassword}
                />
            )}
            {selectedForm === 'filial' && (
                <Filial
                    name={name}
                    document={document}
                    email={email}
                    full_address={full_address}
                    password={password}
                    setName={setName}
                    setDocument={setDocument}
                    setEmail={setEmail}
                    setFullAddress={setFullAddress}
                    setPassword={setPassword}
                />
            )}

            <View style={styles.submitButton}>
                <TouchableOpacity onPress={handleSubmit} disabled={loading}>
                    {loading ? (
                        <ActivityIndicator />
                    ) : (
                        <Text style={styles.submitText}>Cadastrar</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        marginBottom: 10,
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 20,
    },
    submitButton: {
        marginTop: 20,
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 5,
    },
    submitText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default TelaCadastroUsuarios;
