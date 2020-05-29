import React, {useState, useEffect} from 'react';
import socketio from 'socket.io-client';
import {ScrollView, StatusBar, AsyncStorage, Image, StyleSheet, Alert } from 'react-native';

import SpotList from '../components/SpotList'

import logo from '../assets/logo.png';

const List = () => {
  const [techs, setTechs] = useState([]);

  useEffect(()=> {
    AsyncStorage.getItem('user').then(user_id => {
      const socket = socketio('http://192.168.0.10:3333', {
        query: {user_id}
      })

      socket.on('booking_response', booking => {
        console.log(booking);
        Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`);
      })
    })
  }, [])

  useEffect(()=>{
    AsyncStorage.getItem('techs').then(storagedTechs => {
      const techsArray = storagedTechs.split(',').map(tech => tech.trim());
      
      setTechs(techsArray);
    })
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff"/>
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