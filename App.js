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
      newanuncio.set('Nome', dados);
      newanuncio.set('Valor', dados);
      //save it on Back4App Data Store
      await newanuncio.save();
    } catch (error) {
      console.log('Error saving new anuncio: ', error);
    }
  }

  async function fetchAnuncio() {
    //create your Parse Query using the anuncio Class you've created
    let query = new Parse.Query('Anuncio');
    //run the query to retrieve all objects on anuncio class, optionally you can add your filters
    let queryResult = await query.find();
    //the resul is an arry of objects. Pick the first result 
    const currentAnuncio = queryResult[0];
    setAnuncio(anuncio)
    //access the Parse Object attributes
    console.log('Nome', currentAnuncio.get('Nome'));
    console.log('valor', currentAnuncio.get('valor'));
    setAnuncio(currentAnuncio);
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
        <TextInput placeholder='Nome' onChange={}></TextInput>
        <TextInput placeholder='valor'></TextInput>
        
        <Button title='Add anuncio' onPress={addAnuncio} />
        <Button title='Fetch anuncio' onPress={fetchAnuncio} />
      </View>
    </SafeAreaView>
  )

}

export default App;