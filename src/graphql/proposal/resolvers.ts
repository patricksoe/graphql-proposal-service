import prisma from "../../lib/prisma";
import {
  CreateProposalArgs,
  UpdateProposalArgs,
  DeleteProposalArgs,
} from "./types";

const proposalResolvers = {
  Query: {
    proposals: async () => {
      return await prisma.proposal.findMany();
    },
    proposal: async (_: any, { id }: { id: number }) => {
      return await prisma.proposal.findUnique({
        where: { id },
        include: {
          steps: true,
        },
      });
    },
  },

  Mutation: {
    createProposal: async (_: any, { input: { name } }: CreateProposalArgs) => {
      return await prisma.proposal.create({
        data: {
          name: name,
        },
      });
    },
    updateProposal: async (
      _: any,
      { id, input: { name } }: UpdateProposalArgs
    ) => {
      return await prisma.proposal.update({
        where: { id: parseInt(id) },
        data: {
          name: name,
        },
      });
    },
    deleteProposal: async (_: any, { id }: DeleteProposalArgs) => {
      return await prisma.proposal.delete({
        where: { id: parseInt(id) },
      });
    },
  },
};

export default proposalResolvers;
