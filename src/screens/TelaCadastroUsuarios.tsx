import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Alert, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

const TelaCadastroUsuarios = () => {
    const [selectedForm, setSelectedForm] = useState('motorista');
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState('');
    const [document, setDocument] = useState('');
    const [email, setEmail] = useState('');
    const [full_address, setFullAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

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
        if (password !== confirmPassword) {
            Alert.alert('Erro', 'As senhas não coincidem.');
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
                setConfirmPassword('');
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
            <View style={styles.form}>
                <Text style={styles.title}>Selecione o perfil:</Text>

                <Picker
                    selectedValue={selectedForm}
                    style={styles.picker}
                    onValueChange={(itemValue) => setSelectedForm(itemValue)}
                >
                    <Picker.Item label="Motorista" value="motorista" />
                    <Picker.Item label="Filial" value="filial" />
                </Picker>

                <TextInput
                    style={styles.input}
                    placeholder="Nome completo"
                    value={name}
                    onChangeText={setName}
                />
                {selectedForm === 'motorista' ? (
                    <TextInput
                        style={styles.input}
                        placeholder="CPF"
                        value={document}
                        onChangeText={setDocument}
                    />
                ) : (
                    <TextInput
                        style={styles.input}
                        placeholder="CNPJ"
                        value={document}
                        onChangeText={setDocument}
                    />
                )}
                <TextInput
                    style={styles.input}
                    placeholder="Endereço completo"
                    value={full_address}
                    onChangeText={setFullAddress}
                />
                <View style={styles.loginHeader}>
                    <Icon name="user" size={20} color="#333" style={styles.icon} />
                    <Text style={styles.loginText}>Dados de Login</Text>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    value={password}
                    secureTextEntry
                    onChangeText={setPassword}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Confirmar Senha"
                    value={confirmPassword}
                    secureTextEntry
                    onChangeText={setConfirmPassword}
                />

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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#B0BEC5',
        justifyContent: 'center',
        padding: 5,
    },
    form: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        margin: 20,
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
        backgroundColor: '#2E7D32',
        padding: 15,
        borderRadius: 5,
    },
    submitText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#000',
        padding: 10,
        marginBottom: 20,
        borderRadius: 20,
    },
    loginHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    loginText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 5,
    },
    icon: {
        marginRight: 5,
    },
});

export default TelaCadastroUsuarios;
