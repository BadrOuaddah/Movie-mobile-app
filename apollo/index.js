const { ApolloServer, gql } = require("apollo-server");
const fetch = require("node-fetch");

const typeDefs = gql`
  type Movie {
    Title: String
    Year: String
    Rated: String
    Released: String
    Runtime: String
    Genre: String
    Director: String
    Writer: String
    Actors: String
    Plot: String
    Language: String
    Country: String
    Awards: String
    Poster: String
    Ratings: [Rating]
    Metascore: String
    imdbRating: String
    imdbVotes: String
    imdbID: String
    Type: String
    DVD: String
    BoxOffice: String
    Production: String
    Website: String
    Response: String
  }

  type Rating {
    Source: String
    Value: String
  }

  type Query {
    getMovie(title: String!): Movie
  }
`;

const resolvers = {
	Query: {
		getMovie: async (_, { title }) => {
			try {
				const apiKey = "31c10f94";
				const response = await fetch(`http://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${apiKey}`);
				const data = await response.json();

				if (data.Response === "False") {
					throw new Error(data.Error);
				}

				return data;
			} catch (error) {
				console.error(error);
				throw new Error("Failed to fetch movie data");
			}
		},
	},
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true, 
  cors: {
    origin: "*",
    methods: "GET,POST"
  }
});

server.listen({ host: '0.0.0.0', port: 4000 }).then(({ url }) => {
  console.log(`✅ Server ready at ${url}`);
});
