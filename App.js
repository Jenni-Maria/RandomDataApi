import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

const URL= 'https://random-data-api.com/api/v2/beers'

/*
const backend = {
  url: 'https://random-data-api.com/api/v2/beers',
  apiKey: '123hjgeogir123'
}
*/

export default function App() {
  const [brand, setBrand] = useState('')
  const [name, setName] = useState('')
  const [style, setStyle] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(URL)
      .then(response => response.json())
      .then(json => {
        setBrand(json.brand)
        setName(json.name)
        setStyle(json.style)
        setIsLoading(false)
    }).catch(error => {
      console.log(error)
      setError(error)
      setIsLoading(false)
    })
  }, [])

if (error) {
  return (
    <View style={styles.container}>
        <Text>Error retrieving beer of the day</Text>
    </View>
  )
}

else if (isLoading) {
  return (
    <View style={styles.container}>
        <Text>Loading a new beer fact...</Text>
        <ActivityIndicator size='large'/>
    </View>
  )
} else {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Beer of the day</Text>
      <Text>{brand}</Text>
      <Text>{name}</Text>
      <Text>{style}</Text>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f0f0f0',
    marginBottom: 16,
  }
});
