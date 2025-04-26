import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "@apollo/server/plugin/landingPage/graphqlPlayground";
import "dotenv/config";

import { typeDefs, resolvers } from "./graphql";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const start = async () => {
  const port = parseInt(process.env.PORT || "4000");
  const { url } = await startStandaloneServer(server, {
    listen: { port },
  });

  console.log(`Server running at ${url}`);
};

start();
