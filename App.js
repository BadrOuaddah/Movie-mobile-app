import React, { useState } from "react";
import i18next from "i18next";
import { Button, StyleSheet, Text, View, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import SearchLabel from "./components/SearchLabel";
import ToastMessage, { showToast } from "./components/ToastMessage";
import "./i18n/i18n.config";


export default function App() {
  const { t } = useTranslation();
  const [language, setLanguage] = useState("en");
  const [movie, setMovie] = useState(null);
  const [movieTitle, setMovieTitle] = useState("");

  const getMovie = async () => {
    try {
      const url = `http://www.omdbapi.com/?t=${movieTitle}&apikey=31c10f94`;
      const response = await fetch(url);
      const responseJson = await response.json();
      if (responseJson.Response === "True") {
        setMovie(responseJson);
        showToast("success", t("movieFound"));
      } else {
        setMovie(null);
        showToast("error", t("movieNotFound"));
      }
    } catch (error) {
      console.error("Error fetching movie:", error);
      showToast("error", t("errorFetching"));
    }
  };

  const handleClick = () => {
    getMovie();
  };

  const changeLanguage = (lang) => {
    i18next.changeLanguage(lang);
    setLanguage(lang);
  };

  return (
    <LinearGradient colors={["#2c3e50", "#bdc3c7"]} style={styles.container}>
      <Text style={styles.boldText}>{t("title")}</Text>
      <SearchLabel
        value={movieTitle}
        setSearchValue={setMovieTitle}
      />
      <Button title={t("clickHere")} onPress={handleClick} />
      {movie && (
        <View style={styles.movieDetails}>
          <Image source={{ uri: movie.Poster }} style={styles.image} />
          <Text style={styles.title}>{movie.Title}</Text>
          <Text>{t("details.year")}: {movie.Year}</Text>
          <Text>{t("details.genre")}: {movie.Genre}</Text>
          <Text>{t("details.language")}: {movie.Language}</Text>
          <Text>{t("details.country")}: {movie.Country}</Text>
        </View>
      )}
      <View style={styles.languageSwitcher}>
        <Button title="English" onPress={() => changeLanguage("en")} />
        <Button title="Français" onPress={() => changeLanguage("fr")} />
        <Button title="Español" onPress={() => changeLanguage("es")} />
        <Button title="Italiano" onPress={() => changeLanguage("it")} />
      </View>
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
    marginTop: 20,
    backgroundColor: "#C0C0C0",
    borderRadius: 10,
    padding: 16,
    marginTop: 16,
    width: 320,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5
  },
  image: {
    width: 200,
    height: 300,
    marginBottom: 15
  },
  languageSwitcher: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    width: "100%"
  }
});
