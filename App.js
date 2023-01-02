import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import React,{useState} from 'react';

export default function App() {

  const [age, setAge] = useState("");
  const [gender,setGender] = useState("");
  const [priceMin,setPriceMin] = useState("");
  const [priceMax,setPriceMax] = useState("");
  const [hobbies,setHobbies] = useState("");



  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to the gift generator </Text>
      <Text style={styles.gender}>Gender</Text>
      <Text style={styles.male} >Male</Text>
      <Text style={styles.female} >Female</Text>
      






      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  age:{},
  gender:{},
  priceMin:{  },
  priceMax:{  },

});
