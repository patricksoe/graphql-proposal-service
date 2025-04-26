const typeDefs = `#graphql
  enum ProposalSortField {
    CREATED_AT
    NAME
  }

  enum SortDirection {
    asc
    desc
  }

  input ProposalSort {
    field: ProposalSortField!
    direction: SortDirection! = desc
  }

  type Proposal {
    id: ID!
    name: String!
    steps: [Step!]!
    days: [Day!]!
    createdAt: String!
    updatedAt: String!
  }

  input ProposalInput {
    name: String!
    steps: [StepInput!]
  }

  type Query {
    proposals(sort: ProposalSort): [Proposal!]!
    proposal(id: Int!): Proposal
  }

  type Mutation {
    createProposal(input: ProposalInput!): Proposal!
    updateProposal(id: ID!, input: ProposalInput!): Proposal!
    deleteProposal(id: ID!): Proposal!
  }
`;

export default typeDefs;
