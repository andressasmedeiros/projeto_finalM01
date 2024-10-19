import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface HeaderProps {
  name: string;
  profile: string;
}

const Header: React.FC<HeaderProps> = ({ name, profile }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Bem-vindo, {name}!</Text>
      <Text style={styles.subHeaderText}>Perfil: {profile}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#f8f8f8',
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subHeaderText: {
    fontSize: 16,
    color: 'gray',
  },
});

export default Header;
