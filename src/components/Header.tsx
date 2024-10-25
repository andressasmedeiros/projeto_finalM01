import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface HeaderProps {
  name: string;
}

const Header: React.FC<HeaderProps> = ({name}) => {
  return (
    <View style={styles.header}>
      <Image source={require('../../assets/perfil2.jpeg')}style={styles.profileImage}/>
      <Text style={styles.headerText}>Olá, {name}!</Text>      
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#f8f8f8',
    flexDirection: 'row',
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
    marginLeft: 20,
  },
  profileImage: {
    width: 80, 
    height: 80, 
    borderRadius: 15,
  },
});

export default Header;
