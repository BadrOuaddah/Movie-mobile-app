const { ApolloServer, gql } = require("apollo-server");
const axios = require("axios");

const typeDefs = gql`
  type Movie {
    Title: String
    Year: String
    Genre: String
    Director: String
    Actors: String
    Plot: String
    Poster: String
  }

  type Query {
    getMovie(title: String!): Movie
  }
`;

const resolvers = {
  Query: {
    getMovie: async (_, { title }) => {
      const API_KEY = "31c10f94";
      const url = `http://www.omdbapi.com/?t=${title}&apikey=${API_KEY}`;
      try {
        const response = await axios.get(url);
        if (response.data.Response === "True") {
          return response.data;
        } else {
          throw new Error(response.data.Error);
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
