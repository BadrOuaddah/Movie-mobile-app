import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, StyleSheet, Text, View, TextInput, Image } from "react-native";
import SearchLabel from "./components/SearchLabel";

export default function App() {
  const [movie, setMovie] = useState(null);
  const [movieTitle, setMovieTitle] = useState("");

  const getMovie = async () => {
    try {
      const url = `http://www.omdbapi.com/?t=${movieTitle}&apikey=31c10f94`;
      const response = await fetch(url);
      const responseJson = await response.json();
      if (responseJson.Response === "True") {
        setMovie(responseJson);
      } else {
        setMovie(null);
        alert("Movie not found.");
      }
    } catch (error) {
      console.error("Error fetching movie:", error);
    }
  };

  const handleClick = () => {
    getMovie();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.boldText}>E-Movie application</Text>
      {/* <SearchLabel></SearchLabel> */}
      <Text></Text>
      <SearchLabel value={movieTitle} setSearchValue={setMovieTitle} />
      <Text></Text>
      <View>
        <Button title="Click here" onPress={handleClick} />
      </View>
      <Text></Text>
  
      <Text></Text>
      <StatusBar style="auto" />
      {movie && (
        <View style={styles.movieDetails}>
          <Image source={{ uri: movie.Poster }} style={styles.image} />
          <Text style={styles.title}>{movie.Title}</Text>
          <Text>Year: {movie.Year}</Text>
          <Text>Genre: {movie.Genre}</Text>
          <Text>Language: {movie.Language}</Text>
          <Text>Country: {movie.Country}</Text>
        </View>
      )}
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
    paddingHorizontal: 30,
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
  image: {
    width: 200,
    height: 300,
    marginBottom: 15,
  },
});
