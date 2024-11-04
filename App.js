import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
} from "react-native";

export default function App() {
  const [name, setname] = useState("");
  const handleClick = () => {};
  const [people, setpeople] = useState([
    { name: "Ahmed", key: "1" },
    { name: "Ali", key: "2" },
    { name: "Omar", key: "3" },
    { name: "Mohammed", key: "4" },
    { name: "Saad", key: "5" },
    { name: "Rachid", key: "6" },
    { name: "Brahim", key: "7" },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.boldText}>Hello World!</Text>
      <Text></Text>
      <Text style={styles.boldText}>Enter your name : </Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setname(text)}
        placeholder="Name"
      ></TextInput>
      <View>
        <Button title="Click here" onPress={handleClick} />
      </View>
      <StatusBar style="auto" />
      <Text></Text>
      <ScrollView>
        {people.map((item) => {
          return (
            <View key={item.key}>
              <Text style={styles.item}>{item.name}</Text>
            </View>
          );
        })}
      </ScrollView>
      <Text></Text>
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
  item: {
    marginTop: 24,
    padding: 30,
    backgroundColor: "#a28089",
    fontSize: 20,
  },
});
