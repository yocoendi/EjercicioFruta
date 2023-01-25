import React, { useEffect, useState } from 'react';
import { Text, FlatList, StyleSheet, RefreshControl, ScrollView } from 'react-native';



const wait = (timeout) => {

  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });

}



export default function App() {

  const [data, setData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const movieURL = "https://reactnative.dev/movies.json";



  useEffect(() => {

    fetch(movieURL)

      .then(response => response.json())
      .then((responseJson) => {

        console.log('getting data from fetch', responseJson);

        setFruits(responseJson);

      })

      .catch(error => console.log('errores', error));

  }, [])




  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));

  }, []);



  const printElement = ({ item }) => {

    return (

      <ScrollView refreshControl=
        {<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <Text style={styles.text}>{item.id}: {item.title}, {item.releaseYear}</Text>

      </ScrollView>



    )

  }



  return (

    <FlatList
      data={data}
      renderItem={printElement}
      keyExtractor={data => data.id}

    />

  )

}



const styles = StyleSheet.create({

  text: {



    fontSize: 20,

    margin: 15

  }

});