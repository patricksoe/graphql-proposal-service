import prisma from "../../lib/prisma";
import { CreateStepArgs, UpdateStepArgs, DeleteStepArgs } from "./types";

const stepResolvers = {
  Query: {
    steps: async () => {
      try {
        return await prisma.step.findMany({
          include: {
            days: {
              orderBy: [
                { order: "asc" }
              ]
            },
          },
        });
      } catch (error) {
        console.error("Error fetching steps:", error);
        throw new Error("Failed to fetch steps");
      }
    },
    step: async (_: any, { id }: { id: string }) => {
      try {
        const step = await prisma.step.findUnique({
          where: { id: parseInt(id) },
          include: {
            days: {
              orderBy: [
                { order: "asc" }
              ]
            },
          },
        });

        if (!step) {
          throw new Error("Step not found");
        }

        return step;
      } catch (error) {
        console.error("Error fetching step:", error);
        throw new Error("Failed to fetch step");
      }
    },
  },
  Mutation: {
    createStep: async (_: any, { input }: CreateStepArgs) => {
      try {
        return await prisma.step.create({
          data: input,
        });
      } catch (error) {
        console.error("Error creating step:", error);
        throw new Error("Failed to create step");
      }
    },
    updateStep: async (_: any, { id, input }: UpdateStepArgs) => {
      try {
        return await prisma.step.update({
          where: { id: parseInt(id) },
          data: input,
        });
      } catch (error) {
        console.error("Error updating step:", error);
        throw new Error("Failed to update step");
      }
    },
    deleteStep: async (_: any, { id }: DeleteStepArgs) => {
      try {
        const result = await prisma.$transaction(async (tx) => {
          const stepId = parseInt(id);
          await tx.day.deleteMany({
            where: { stepId },
          });

          const deletedStep = await tx.step.delete({
            where: { id: stepId },
          });

          const { order, proposalId } = deletedStep;
          await tx.step.updateMany({
            where: {
              proposalId,
              order: {
                gt: order,
              },
            },
            data: {
              order: {
                decrement: 1,
              },
            },
          });

          return deletedStep;
        });

        return result;
      } catch (error) {
        console.error("Error deleting step:", error);
        throw new Error("Failed to delete step");
      }
    },
  },
};

export default stepResolvers;
