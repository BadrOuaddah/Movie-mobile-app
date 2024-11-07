import React, { Component } from "react";
import { TextInput, View, StyleSheet } from "react-native";

const SearchLabel = (props) => {
  return (
    <View style={styles.label}>
      <TextInput placeholder="Type here to search..." value={props.value} onChange={}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    marginVertical: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: "#111",
    padding: 8,
    margin: 10,
    width: 200,
  },
});

export default SearchLabel;
