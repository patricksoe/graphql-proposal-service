import prisma from "../../lib/prisma";

const dayResolvers = {
  Query: {
    days: async () => {
      return await prisma.day.findMany();
    },
    day: async (_: any, { id }: { id: string }) => {
      return await prisma.day.findUnique({
        where: { id: parseInt(id) },
      });
    },
  },
  Mutation: {
    createDay: async (_: any, { input }: any) => {
      return await prisma.day.create({
        data: {
          order: input.order,
          name: input.name,
          proposalId: input.proposalId,
          stepId: input.stepId,
        },
      });
    },
    updateDay: async (_: any, { id, input }: any) => {
      return await prisma.day.update({
        where: { id: parseInt(id) },
        data: {
          order: input.order,
          name: input.name,
          proposalId: input.proposalId,
          stepId: input.stepId,
        },
      });
    },
    deleteDay: async (_: any, { id }: any) => {
      return await prisma.day.delete({
        where: { id: parseInt(id) },
      });
    },
  },
};

export default dayResolvers;
