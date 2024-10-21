import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { CadastroProps } from '../../types';

const Filial: React.FC<CadastroProps> = ({ name, document, full_address, email, password, setName, setDocument, setFullAddress, setEmail, setPassword }) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nome da Filial"
                value={name}
                onChangeText={setName} // Atualiza o estado no componente pai
            />
            <TextInput
                style={styles.input}
                placeholder="CNPJ"
                value={document}
                onChangeText={setDocument} // Atualiza o estado no componente pai
            />
            <TextInput
                style={styles.input}
                placeholder="Endereço completo"
                value={full_address}
                onChangeText={setFullAddress} // Atualiza o estado no componente pai
            />
            <Text>Dados de Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail} // Atualiza o estado no componente pai
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={password}
                secureTextEntry
                onChangeText={setPassword} // Atualiza o estado no componente pai
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
    },
});

export default Filial;
