import React, { useState } from "react";
import i18next from "i18next";
import { Button, StyleSheet, Text, View, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import { Picker } from "@react-native-picker/picker";
import SearchLabel from "./components/SearchLabel";
import ToastMessage, { showToast } from "./components/ToastMessage";
import MovieList from "./components/MovieList";
import "./i18n/i18n.config";

export default function App() {
	const { t } = useTranslation();
	const [language, setLanguage] = useState("en");
	const [movieTitle, setMovieTitle] = useState("");
	const [movies, setMovies] = useState([]);

	const getMovie = async () => {
		try {
			const url = `http://www.omdbapi.com/?s=${movieTitle}&apikey=31c10f94`;
			const response = await fetch(url);
			const responseJson = await response.json();
			if (responseJson.Response === "True") {
				setMovies(responseJson.Search);
				showToast("success", t("movieFound"));
			} else {
				setMovies([]);
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
		showToast("success", `Language switched to ${lang}`);
	};

	return (
		<LinearGradient colors={["#2c3e50", "#bdc3c7"]} style={styles.container}>
			<Text style={styles.boldText}>{t("title")}</Text>
			<SearchLabel value={movieTitle} setSearchValue={setMovieTitle} />
			<Button title={t("clickHere")} onPress={handleClick} />  
			<Text></Text>    
			{movies.length > 0 ? (
				<ScrollView>
					<MovieList movies={movies} />
				</ScrollView>
			) : (
				<Text>{t("No Movies Found")}</Text>
			)}
			<View style={styles.languageSwitcher}>
				<Text style={styles.pickerLabel}>{t("🌐 Select language :")}</Text>
				<Picker
					selectedValue={language}
					onValueChange={(itemValue) => changeLanguage(itemValue)}
					style={styles.picker}
				>
					<Picker.Item label="English" value="en" />
					<Picker.Item label="Français" value="fr" />
					<Picker.Item label="Español" value="es" />
					<Picker.Item label="Italiano" value="it" />
				</Picker>
			</View>
			<Text></Text>
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
		fontSize: 25,
		marginBottom: 20,
	},
	movieDetails: {
		alignItems: "center",
		marginTop: 20,
		backgroundColor: "#C0C0C0",
		borderRadius: 10,
		padding: 16,
		// eslint-disable-next-line no-dupe-keys
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
		marginTop: 20,
	},
	pickerLabel: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 10,
	},
	picker: {
		backgroundColor: "#ccc",
		borderRadius: 5,
		borderWidth: 1,
		borderColor: "#ccc",
	},
});