import { useState } from "react";
import { Button, StyleSheet, Text, View, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import SearchLabel from "./components/SearchLabel";
import ToastMessage, { showToast } from "./components/ToastMessage";

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
        showToast("success", "✔️ Movie found");
      } else {
        setMovie(null);
        showToast("error", "❌ Movie not found");
      }
    } catch (error) {
      console.error("Error fetching movie:", error);
      showToast("error", "Error fetching movie ❌");
    }
  };

  const handleClick = () => {
    getMovie();
  };

  return (
    <LinearGradient colors={["#2c3e50", "#bdc3c7"]} style={styles.container}>
      <Text style={styles.boldText}>E-Movie Application</Text>
      <SearchLabel value={movieTitle} setSearchValue={setMovieTitle} />
      <Button title="Click here" onPress={handleClick} />
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
      <ToastMessage />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 25
  },
  movieDetails: {
    alignItems: "center",
    marginTop: 20
  },
  image: {
    width: 200,
    height: 300,
    marginBottom: 15
  }
});
