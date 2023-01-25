import React, { useEffect, useState } from 'react';
import { Text, FlatList, StyleSheet, RefreshControl, ScrollView } from 'react-native';

const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

export default function App() {
  const [fruits, setFruits] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    fetch("http://10.88.1.224:8080/fruits")
      .then(response => response.json())
      .then((responseJson) => {
        console.log('getting data from fetch', responseJson);
        setFruits(responseJson);
        setLoading(false)
      })
      .catch(error => console.log('errores', error));
  }, [])

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const printElement = ({ item }) => {
    
      return (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <Text style={styles.text}>{item.id}: {item.name}, {item.price}€</Text>
        </ScrollView>
      )
    
  }

  return (
    <FlatList
      data={fruits}
      renderItem={printElement}
      keyExtractor={fruits => fruits.id}
    />
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    margin: 15
  }
});