import React, {useState, useEffect} from 'react';
import {ScrollView, StatusBar, AsyncStorage, Image, StyleSheet } from 'react-native';

import SpotList from '../components/SpotList'

import logo from '../assets/logo.png';

const List = () => {
  const [techs, setTechs] = useState([]);

  useEffect(()=>{
    AsyncStorage.getItem('techs').then(storagedTechs => {
      const techsArray = storagedTechs.split(',').map(tech => tech.trim());
      
      setTechs(techsArray);
    })
  }, []);

  return (
    <>
      <StatusBar barStyle="default" backgroundColor="rgba(0, 0, 0, 0.2)"/>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Image style={styles.logo} source={logo} />

        {techs.map(tech => <SpotList tech={tech} key={tech} />)}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  logo: {
    height: 32,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 15,
  }
})

export default List;