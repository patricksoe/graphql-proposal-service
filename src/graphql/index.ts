import proposalTypeDefs from "./proposal/typeDefs";
import dayTypeDefs from "./day/typeDefs";
import stepTypeDefs from "./step/typeDefs";

const rootTypeDefs = `
  scalar Date

  type Query {
    _: Boolean
    hello: String
  }

  type Mutation {
    _: Boolean
  }
`;

const typeDefs = [rootTypeDefs, proposalTypeDefs, dayTypeDefs, stepTypeDefs];

const resolvers = {
  Query: {
    hello: () => "Hello world!",
  },
  Mutation: {},
};

export { typeDefs, resolvers };
