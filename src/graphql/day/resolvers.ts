import prisma from "../../lib/prisma";
import { CreateDayArgs, UpdateDayArgs, DeleteDayArgs } from "./types";

const dayResolvers = {
  Query: {
    days: async () => {
      try {
        return await prisma.day.findMany();
      } catch (error) {
        console.error("Error fetching days:", error);
        throw new Error("Failed to fetch days");
      }
    },
    day: async (_: any, { id }: { id: string }) => {
      try {
        const day = await prisma.day.findUnique({
          where: { id: parseInt(id) },
        });

        if (!day) {
          throw new Error("Day not found");
        }

        return day;
      } catch (error) {
        console.error("Error fetching day:", error);
        throw new Error("Failed to fetch day");
      }
    },
  },
  Mutation: {
    createDay: async (_: any, { input }: CreateDayArgs) => {
      try {
        return await prisma.day.create({
          data: {
            order: input.order,
            name: input.name,
            proposalId: input.proposalId,
            stepId: input.stepId,
          },
        });
      } catch (error) {
        console.error("Error creating day:", error);
        throw new Error("Failed to create day");
      }
    },
    updateDay: async (_: any, { id, input }: UpdateDayArgs) => {
      try {
        return await prisma.day.update({
          where: { id: parseInt(id) },
          data: {
            order: input.order,
            name: input.name,
            proposalId: input.proposalId,
            stepId: input.stepId,
          },
        });
      } catch (error) {
        console.error("Error updating day:", error);
        throw new Error("Failed to update day");
      }
    },
    deleteDay: async (_: any, { id }: DeleteDayArgs) => {
      try {
        const result = await prisma.$transaction(async (tx) => {
          const dayId = parseInt(id);
          const dayToDelete = await tx.day.findUniqueOrThrow({
            where: { id: dayId },
          });

          await tx.day.delete({
            where: { id: dayId },
          });

          const stepId = dayToDelete.stepId;
          const remainingDays = await tx.day.findMany({
            where: { stepId },
            orderBy: { order: "asc" },
          });

          await Promise.all(
            remainingDays.map((day, index) =>
              tx.day.update({
                where: { id: day.id },
                data: { order: index + 1 },
              })
            )
          );

          return dayToDelete;
        });

        return result;
      } catch (error) {
        console.error("Error deleting and reordering days:", error);
        throw new Error("Failed to delete and reorder days");
      }
    },
  },
};

export default dayResolvers;
