import prisma from "../../lib/prisma";

export const stepResolvers = {
  Query: {
    steps: async () => await prisma.step.findMany(),
    step: async (_: any, { id }: { id: string }) =>
      await prisma.step.findUnique({ where: { id: parseInt(id) } }),
  },
  Mutation: {
    createStep: async (_: any, { input }: any) => {
      return await prisma.step.create({ data: input });
    },
    updateStep: async (_: any, { id, input }: any) => {
      return await prisma.step.update({
        where: { id: parseInt(id) },
        data: input,
      });
    },
    deleteStep: async (_: any, { id }: any) => {
      return await prisma.step.delete({
        where: { id: parseInt(id) },
      });
    },
  },
};

export default stepResolvers;
