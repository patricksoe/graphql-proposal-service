import proposalTypeDefs from "./proposal/typeDefs";
import dayTypeDefs from "./day/typeDefs";
import stepTypeDefs from "./step/typeDefs";

import proposalResolvers from "./proposal/resolvers";

const typeDefs = [proposalTypeDefs, dayTypeDefs, stepTypeDefs];

const resolvers = {
  Query: {
    ...proposalResolvers.Query,
  },
  Mutation: {
    ...proposalResolvers.Mutation,
  },
};

export { typeDefs, resolvers };
