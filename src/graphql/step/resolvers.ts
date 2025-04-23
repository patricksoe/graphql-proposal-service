import prisma from "../../lib/prisma";
import {
  CreateStepArgs,
  UpdateStepArgs,
  DeleteStepArgs,
} from "./types";

export const stepResolvers = {
  Query: {
    steps: async () =>
      await prisma.step.findMany({
        include: {
          days: true,
        },
      }),
    step: async (_: any, { id }: { id: string }) =>
      await prisma.step.findUnique({ where: { id: parseInt(id) } }),
  },
  Mutation: {
    createStep: async (_: any, { input }: CreateStepArgs) => {
      return await prisma.step.create({ data: input });
    },
    updateStep: async (_: any, { id, input }: UpdateStepArgs) => {
      return await prisma.step.update({
        where: { id: parseInt(id) },
        data: input,
      });
    },
    deleteStep: async (_: any, { id }: DeleteStepArgs) => {
      return await prisma.step.delete({
        where: { id: parseInt(id) },
      });
    },
  },
};

export default stepResolvers;
