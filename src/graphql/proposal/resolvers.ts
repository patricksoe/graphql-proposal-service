import prisma from "../../lib/prisma";
import {
  CreateProposalArgs,
  UpdateProposalArgs,
  DeleteProposalArgs,
} from "./types";

const proposalResolvers = {
  Query: {
    proposals: async () => {
      try {
        return await prisma.proposal.findMany({
          include: {
            steps: true,
            days: true,
          },
        });
      } catch (error) {
        console.error("Error fetching proposals:", error);
        throw new Error("Failed to fetch proposals.");
      }
    },
    proposal: async (_: any, { id }: { id: number }) => {
      try {
        const proposal = await prisma.proposal.findUnique({
          where: { id },
          include: {
            steps: true,
            days: true,
          },
        });

        if (!proposal) {
          throw new Error("Proposal not found.");
        }

        return proposal;
      } catch (error) {
        console.error("Error fetching proposal:", error);
        throw new Error("Failed to fetch proposal.");
      }
    },
  },

  Mutation: {
    createProposal: async (_: any, { input }: any) => {
      try {
        const { name, steps } = input;

        const result = await prisma.$transaction(async (tx) => {
          const proposal = await tx.proposal.create({
            data: { name },
          });

          for (const stepInput of steps) {
            const step = await tx.step.create({
              data: {
                name: stepInput.name,
                order: stepInput.order,
                proposalId: proposal.id,
              },
            });

            for (const dayInput of stepInput.days) {
              await tx.day.create({
                data: {
                  name: dayInput.name,
                  order: dayInput.order,
                  proposalId: proposal.id,
                  stepId: step.id,
                },
              });
            }
          }

          return tx.proposal.findUnique({
            where: { id: proposal.id },
            include: {
              steps: {
                include: {
                  days: true,
                },
              },
            },
          });
        });

        return result;
      } catch (error) {
        console.error("Error creating proposal:", error);
        throw new Error("Failed to create proposal. Please try again.");
      }
    },
    updateProposal: async (
      _: any,
      { id, input: { name } }: UpdateProposalArgs
    ) => {
      try {
        return await prisma.proposal.update({
          where: { id: parseInt(id) },
          data: {
            name: name,
          },
        });
      } catch (error) {
        console.error("Error updating proposal:", error);
        throw new Error("Failed to update proposal.");
      }
    },
    deleteProposal: async (_: any, { id }: DeleteProposalArgs) => {
      try {
        return await prisma.proposal.delete({
          where: { id: parseInt(id) },
        });
      } catch (error) {
        console.error("Error deleting proposal:", error);
        throw new Error("Failed to delete proposal.");
      }
    },
  },
};

export default proposalResolvers;
