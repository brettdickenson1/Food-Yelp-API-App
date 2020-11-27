import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import yelp from '../api/yelp';

const ResultsShowScreen = ({ navigation }) => {
  const [result, setResult] = useState(null);
  const id = navigation.getParam('id');

  const getResult = async id => {
    const response = await yelp.get(`/${id}`);
    setResult(response.data);
  };
  useEffect(() => {
    getResult(id);
  }, []);

  if (!result) {
    return null;
  }

  return (
    <View>
      <ScrollView>
      <Text style={{fontSize: 25, fontWeight: 'bold', textAlign: 'center', top: 20}}>{result.name}</Text>
      <Text style={{fontSize: 15, textAlign: 'center', top: 30, marginBottom: 10, zIndex: 1}}> Call us: {result.phone}</Text>
      <FlatList 
      style={{alignSelf: 'center', padding: 30}}
        data={result.photos}
        keyExtractor={photo => photo}
        renderItem={({ item }) => {
          return <Image style={styles.image} source={{ uri: item }} />;
        }}
      />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: 300,
    margin: 10,
    borderRadius: 10,
  }
});

export default ResultsShowScreen;
