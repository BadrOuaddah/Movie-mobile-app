import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const SearchBox = ({ value, setSearchValue }) => {
  return (
    <View style={styles.inputContainer}>
      <Icon name="search" size={20} color="#000" style={styles.icon} />
      <TextInput
        style={styles.inputField}
        value={value}
        onChangeText={setSearchValue}
        placeholder="Type here to search..."
        placeholderTextColor="#666"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#C0C0C0",
    borderRadius: 50,
    marginVertical: 10,
  },
  icon: {
    marginRight: 8,
  },
  inputField: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
});

export default SearchBox;
