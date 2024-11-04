import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function App() {
    const [name, setname] = useState('');
    const handleClick = () => {
    };


  return (
    <View style={styles.container}>
      <Text style={styles.boldText}>Hello World!</Text>
      <Text></Text>
      <Text style={styles.boldText}>Enter your name : </Text>
      <TextInput style={styles.input} onChangeText={text => setname(text)} placeholder="Name"></TextInput>
      <View>
        <Button title="Click here" onPress={handleClick} />
      </View>
      <StatusBar style="auto" />
      <Text></Text>
      <Text>Hello {name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  boldText: {
    fontWeight: "bold",
    fontSize: 25,
  },
  input: {
    borderWidth: 1,
    borderColor: "#111",
    padding: 8,
    margin: 10,
    width: 200,
  },
});
