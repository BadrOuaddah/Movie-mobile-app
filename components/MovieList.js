import React from "react";
import { View, Image, StyleSheet } from "react-native";

const MovieList = (props) => {
	return (
		<View style={styles.container}>
			{props.movies.map((movie, index) => (
				<View key={index} style={styles.imageContainer}>
					<Image
						source={{ uri: movie.Poster }}
						style={styles.moviePoster}
						resizeMode="cover"
					/>
				</View>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "flex-start",
	},
	imageContainer: {
		margin: 10,
		position: "relative",
	},
	moviePoster: {
		width: 150,
		height: 225,
		borderRadius: 10,
	},
	overlay: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default MovieList;
