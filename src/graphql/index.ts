import proposalTypeDefs from "./proposal/typeDefs";
import dayTypeDefs from "./day/typeDefs";
import stepTypeDefs from "./step/typeDefs";

import proposalResolvers from "./proposal/resolvers";
import stepResolvers from "./step/resolvers";

const typeDefs = [proposalTypeDefs, dayTypeDefs, stepTypeDefs];

const resolvers = {
  Query: {
    ...proposalResolvers.Query,
    ...stepResolvers.Query,
  },
  Mutation: {
    ...proposalResolvers.Mutation,
    ...stepResolvers.Mutation,
  },
};

export { typeDefs, resolvers };
