import { StatusBar } from 'expo-status-bar';
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View,ActivityIndicator ,Alert} from 'react-native';
import React,{useState} from 'react';

export default function App() {

  const [age, setAge] = useState("");
  const [gender,setGender] = useState("");
  const [priceMin,setPriceMin] = useState("");
  const [priceMax,setPriceMax] = useState("");
  const [hobbies,setHobbies] = useState("");

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState('');


  const onSubmit = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    setResult('');
    try {
      const response = await fetch(`http://localhost:8000/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceMin, priceMax, gender, age, hobbies }),
      });
      const data = await response.json();
      setResult(data.result);
    } catch (e) {
      Alert.alert("Couldn't generate ideas", e.message);
    } finally {
      setLoading(false);
    }
  };



if(loading){
  return (
    <SafeAreaView style={{flex:1}}>
      <View style={{
        flex:1,
        justifyContent:"center",
      }}>
        <ActivityIndicator size="large" color="#10a37f" />
      </View>
    </SafeAreaView>


  )
  }

  if(result){
    return(
      <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
        <View style={{alignItems:"center"}}>

          <Text style={styles.header}>Here are your ideas</Text>
        </View>
        <Text style={{
          
          margin:10,
        }}>{result}</Text>
        <View style={{
          alignItems:"center",
        }}
        >
          <Pressable style={{backgroundColor:"#10a37f", padding:10, borderRadius:10,marginTop:50}} onPress={() => setResult("")}>
            <Text style={{color:"white"}}>Generate again</Text>
          </Pressable>

          </View>
      </View>
    </SafeAreaView>
    )
  }



  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
        <View style={{alignItems:"center"}}>
          <Text style={styles.header}>Welcome to the gift generator 🎁  </Text>
        </View>
        <View style={styles.gender}>
          
          <Text style={styles.label}>Who is buying for</Text>
          <View style={styles.genderContainer}>
            <Text style={[styles.selector, gender==="male" && { backgroundColor:"#10a37f"}]} onPress={() => setGender("male")}
            >Male</Text>
            <Text style={[styles.selector, gender === "female" && {backgroundColor:"#10a37f"}]} onPress={() => setGender("female")}>Female</Text>
          </View>
        </View>
        <View  style={styles.age}>
          <Text style={styles.label}>Age</Text>
          <TextInput style={styles.ageInput} placeholder="Enter age" onChangeText={text => setAge(text)} value={age} />
        </View>
        <View style={styles.lowerPrice}>
          <Text style={styles.label}>Lowest Price $</Text>
          <TextInput style={styles.ageInput} placeholder="Enter lower price" onChangeText={text => setPriceMin(text)} value={priceMin} />
        </View>
        <View style={styles.higherPrice}>
          <Text style={styles.label}>Highest Price $</Text>
          <TextInput style={styles.ageInput} placeholder="Enter higher price" onChangeText={text => setPriceMax(text)} value={priceMax} />
        </View>
        <View style={styles.hobbies}>
          <Text style={styles.label}>Hobbies</Text>
          <TextInput style={styles.ageInput} placeholder="Enter hobbies" onChangeText={text => setHobbies(text)} value={hobbies} />
        </View>
        <View style={styles.button}>
          <Pressable style={{backgroundColor:"#10a37f", padding:10, borderRadius:10, margin:10}} onPress={onSubmit}>
            <Text style={{color:"white", textAlign:"center"}}>Generate ideas</Text>
          </Pressable>
        </View>

        

        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   
   
  },
  header:{
    fontSize:22,
   
  },
 gender:{
   
    flexDirection:"column",
    alignContent:"center",
    marginTop:30
  

 },
 label:{
    fontSize:15,
    color:"black",
    margin:10,
 },
 genderContainer:{
    flexDirection:"row",
    
    
 },
  selector:{  
    backgroundColor:"lightgrey",
    padding:10,
    margin:10,
    borderRadius:10,
    fontSize:15,
    color:"black",
    flex:1,
    textAlign:"center",
  },
  age:{
    
    flexDirection:"column",
    alignContent:"center",
  },
  ageInput:{
    
    padding:10,
    margin:10,
    borderRadius:10,
    fontSize:15,
    color:"black",
    borderWidth:1,
  }
 ,
  lowerPrice:{
    flexDirection:"column",
  }
  ,
  higherPrice:{
    flexDirection:"column",
  }
  ,
  hobbies:{
    flexDirection:"column",
  }


});
