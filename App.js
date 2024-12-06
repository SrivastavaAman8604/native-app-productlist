import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Image, StyleSheet, TouchableOpacity, Text, FlatList, Button } from 'react-native';

const App = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define the async function
    const fetchData = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setData(response.data); // Save fetched data in state
      } catch (err) {
        setError(err.message); // Save error message in state
      }
    };

    // Call the function
    fetchData();
  }, []); 

  return (
    <View style={styles.container}>
      <Text style={styles.head}>PRODUCTS</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{uri: item.image}} style={styles.image}/>
            <Text style={styles.title}>{item.title.substring(0,20)}</Text>
            <Text style={styles.price}>Price: ${item.price}</Text>
            <Text style={styles.des}>{item.description.substring(0,90)}...</Text>
            <View style={styles.button}>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.text}>Add to Cart</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.text}>Buy Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
    resizeMode: 'contain',
  },
  head: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  price: {
    fontSize: 20,
    color: '#28a745',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  des: {
    fontSize: 16,
    color: '#222222',
    fontWeight: 'italic',
    marginRight: 20,
    marginLeft: 20,
  },
  btn: {
    backgroundColor: '#007BFF',
    justifyContent: 'space-between',
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  text:{
    color: 'white',
    fontSize: 16,
  },
  button:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    
  },
});

export default App;