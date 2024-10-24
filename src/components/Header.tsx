import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface HeaderProps {
  name: string;
}

const Header: React.FC<HeaderProps> = ({name}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Bem-vindo, {name}!</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#f8f8f8',
    padding: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 20,  
    borderBottomRightRadius: 20, 
    position: 'absolute',        
    top: 0,                      
    left: 0,                     
    right: 0, 
  },
  headerText: {
    fontSize: 20,
  }
});

export default Header;
