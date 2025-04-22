import prisma from "../../lib/prisma";

const proposalResolvers = {
  Query: {
    proposals: async () => {
      return await prisma.proposal.findMany();
    },
    proposal: async (_: any, { id }: { id: number }) => {
      return await prisma.proposal.findUnique({
        where: { id },
      });
    },
  },

  Mutation: {
    createProposal: async (_: any, { input }: any) => {
      console.log(input);
      const newProposal = await prisma.proposal.create({
        data: {
          name: input.name,
        },
      });
      return newProposal;
    },
  },
};

export default proposalResolvers;
