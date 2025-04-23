import proposalTypeDefs from "./proposal/typeDefs";
import dayTypeDefs from "./day/typeDefs";
import stepTypeDefs from "./step/typeDefs";

import proposalResolvers from "./proposal/resolvers";
import stepResolvers from "./step/resolvers";
import dayResolvers from "./day/resolvers";

const typeDefs = [proposalTypeDefs, dayTypeDefs, stepTypeDefs];

const resolvers = {
  Query: {
    ...proposalResolvers.Query,
    ...stepResolvers.Query,
    ...dayResolvers.Query,
  },
  Mutation: {
    ...proposalResolvers.Mutation,
    ...stepResolvers.Mutation,
    ...dayResolvers.Mutation,
  },
};

export { typeDefs, resolvers };
