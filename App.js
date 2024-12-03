import React, { useState } from "react";
import { ApolloClient, InMemoryCache, gql, useLazyQuery, ApolloProvider } from "@apollo/client";
import i18next from "i18next";
import { Button, StyleSheet, Text, View, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import { Picker } from "@react-native-picker/picker";
import SearchLabel from "./components/SearchLabel";
import ToastMessage, { showToast } from "./components/ToastMessage";
import "./i18n/i18n.config";

const client = new ApolloClient({
	uri: "http://10.0.2.2:4000/",
	cache: new InMemoryCache(),
});

// eslint-disable-next-line no-undef
const GET_MOVIE = gql`
	query getMovie($title: String!) {
		getMovie(title: $title) {
			Title
			Year
			Genre
			Language
			Country
			Poster
		}
	}
`;

export default function App() {
	const { t } = useTranslation();
	const [language, setLanguage] = useState("en");
	const [movieTitle, setMovieTitle] = useState("");
	// eslint-disable-next-line no-undef
	const [fetchMovie, { data, loading, error }] = useLazyQuery(GET_MOVIE);

	const handleClick = () => {
		if (movieTitle) {
			fetchMovie({ variables: { title: movieTitle } });
		} else {
			showToast("error", t("movieNotFound"));
		}
	};

	const changeLanguage = (lang) => {
		i18next.changeLanguage(lang);
		setLanguage(lang);
		showToast("success", `Language switched to ${lang}`);
	};

	return (
		<ApolloProvider client={client}>
			<LinearGradient colors={["#2c3e50", "#bdc3c7"]} style={styles.container}>
				<Text style={styles.boldText}>{t("title")}</Text>
				<SearchLabel value={movieTitle} setSearchValue={setMovieTitle} />
				<Button title={t("clickHere")} onPress={handleClick} />
				{loading && <Text>Loading</Text>}
				{error && <Text style={{ color: "red" }}>Error: {error.message}</Text>}
				{data && data.getMovie && (
					<View style={styles.movieDetails}>
						<Image source={{ uri: data.getMovie.Poster }} style={styles.image} />
						<Text style={styles.title}>{data.getMovie.Title}</Text>
						<Text>{t("details.year")}: {data.getMovie.Year}</Text>
						<Text>{t("details.genre")}: {data.getMovie.Genre}</Text>
						<Text>{t("details.language")}: {data.getMovie.Language}</Text>
						<Text>{t("details.country")}: {data.getMovie.Country}</Text>
					</View>
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
				<ToastMessage />
			</LinearGradient>
		</ApolloProvider>
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
		width: "100%",
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
