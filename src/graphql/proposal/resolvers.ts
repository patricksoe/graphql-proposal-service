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
      return await prisma.proposal.create({
        data: {
          name: input.name,
        },
      });
    },
    updateProposal: async (_: any, { id, input }: any) => {
      return await prisma.proposal.update({
        where: { id: parseInt(id) },
        data: {
          name: input.name,
        },
      });
    },
  },
};

export default proposalResolvers;
