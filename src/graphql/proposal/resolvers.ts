import prisma from "../../lib/prisma";
import {
  ProposalsSortArgs,
  ProposalFilterArg,
  CreateProposalArgs,
  UpdateProposalArgs,
  DeleteProposalArgs,
} from "./types";

const proposalResolvers = {
  Query: {
    proposals: async (
      _: any,
      { sort, filter }: { sort?: ProposalsSortArgs; filter?: ProposalFilterArg }
    ) => {
      try {
        const where: any = {};

        if (filter?.nameContains) {
          where.name = {
            contains: filter.nameContains,
            mode: "insensitive",
          };
        }

        return await prisma.proposal.findMany({
          where,
          orderBy: sort
            ? { [sort.field === "NAME" ? "name" : "createdAt"]: sort.direction }
            : { createdAt: "desc" },
          include: { steps: true, days: true },
        });
      } catch (error) {
        console.error("Error fetching proposals:", error);
        throw new Error("Failed to fetch proposals");
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
          throw new Error("Proposal not found");
        }

        return proposal;
      } catch (error) {
        console.error("Error fetching proposal:", error);
        throw new Error("Failed to fetch proposal");
      }
    },
  },

  Mutation: {
    createProposal: async (_: any, { input }: CreateProposalArgs) => {
      try {
        const { name, steps } = input;

        const result = await prisma.$transaction(async (tx) => {
          const proposal = await tx.proposal.create({
            data: { name },
          });

          if (!steps?.length) {
            return proposal;
          }

          for (const stepInput of steps) {
            const step = await tx.step.create({
              data: {
                name: stepInput.name,
                order: stepInput.order,
                proposalId: proposal.id,
              },
            });

            if (stepInput.days?.length) {
              await Promise.all(
                stepInput.days.map((dayInput) =>
                  tx.day.create({
                    data: {
                      name: dayInput.name,
                      order: dayInput.order,
                      proposalId: proposal.id,
                      stepId: step.id,
                    },
                  })
                )
              );
            }
          }

          return tx.proposal.findUnique({
            where: { id: proposal.id },
            include: {
              steps: true,
              days: true,
            },
          });
        });

        return result;
      } catch (error) {
        console.error("Error creating proposal:", error);
        throw new Error("Failed to create proposal. Please try again");
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
        throw new Error("Failed to update proposal");
      }
    },
    deleteProposal: async (_: any, { id }: DeleteProposalArgs) => {
      try {
        const result = await prisma.$transaction(async (tx) => {
          const proposalId = parseInt(id);

          await tx.day.deleteMany({
            where: {
              step: {
                proposalId,
              },
            },
          });

          await tx.step.deleteMany({
            where: {
              proposalId,
            },
          });

          const deletedProposal = await tx.proposal.delete({
            where: { id: proposalId },
          });

          return deletedProposal;
        });

        return result;
      } catch (error) {
        console.error("Error deleting proposal:", error);
        throw new Error("Failed to delete proposal");
      }
    },
  },
};

export default proposalResolvers;
