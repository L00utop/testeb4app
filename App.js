import React, { useEffect, useState } from 'react';
import { View, Button, Text, SafeAreaView, TextInput } from 'react-native';

import Parse from 'parse/react-native.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

Parse.setAsyncStorage(AsyncStorage);
//Paste below the Back4App Application ID AND the JavaScript KEY
Parse.initialize('UDxTTEBuMJoiSJEEQkN6HdTXmokEu8wtb9phGEYk', '9qUgqmdOgxf59RlVRxAWrKFdawkFuSsvSorAtix0');
//Point to Back4App Parse API address 
Parse.serverURL = 'https://parseapi.back4app.com/';

const App = () => {
  const [anuncio, setAnuncio] = useState(new Parse.Object('Anuncio'));

  async function addAnuncio() {
    try {
      //create a new Parse Object instance
      const newanuncio = new Parse.Object('Anuncio');
      //define the attributes you want for your Object
      newanuncio.set('Nome', dados.Nome);
      newanuncio.set('Valor', dados.valor);
      //save it on Back4App Data Store
      await newanuncio.save();
    } catch (error) {
      console.log('Error saving new anuncio: ', error);
    }
  }

  async function fetchAnuncio() {
    let query = new Parse.Query('Anuncio');
    let queryResult = await query.find();
    console.log(queryResult);
    const listaDeAnuncios = queryResult;    
    listaDeAnuncios.map(anuncio=>{console.log(anuncio.id +" - "+ anuncio.get("Nome"))});

  }

  useEffect(() => {
    fetchAnuncio()
  }, []);



let dados = {
  Nome: "",
  valor: ""
}



  return (
    <SafeAreaView>
      <View>
        <TextInput placeholder='Nome' onChange={(nome)=>{
          dados.Nome = nome.nativeEvent.text;
          console.log(dados)
        }}></TextInput>
        <TextInput placeholder='Valor' onChange={(value)=>{
          dados.valor = value.nativeEvent.text;
          console.log(dados)
        }}></TextInput>
        
        <Button title='Add anuncio' onPress={addAnuncio} />
        <Button title='Fetch anuncio' onPress={fetchAnuncio} />
      </View>
    </SafeAreaView>
  )

}

export default App;