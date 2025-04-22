const typeDefs = `#graphql
  type Step {
    id: ID!
    order: Int!
    name: String!
    proposalId: Int!
    days: [Day!]!   
    createdAt: String!
    updatedAt: String!
  }

  input StepInput {
    name: String!
    order: Int!
    proposalId: Int!
  }

  type Query {
    steps: [Step!]!
    step(id: ID!): Step
  }

  type Mutation {
    createStep(input: StepInput!): Step!
    updateStep(id: ID!, input: StepInput!): Step!
    deleteStep(id: ID!): Step!
  }
`;

export default typeDefs;