import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import "dotenv/config";

import { typeDefs, resolvers } from "./graphql";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const start = async () => {
  const port = parseInt(process.env.PORT || "4000");
  const { url } = await startStandaloneServer(server, {
    listen: { port },
  });

  console.log(`Server running at ${url}`);
};

start();
