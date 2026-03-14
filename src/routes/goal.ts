import { prisma } from "@/lib/prisma";
import { GoalStatus } from "@prisma-client";
import { FastifyInstance } from "fastify";
import { z } from "zod";

export async function goalRoutes(app: FastifyInstance) {
  app.addHook("preHandler", app.verifyAuth);

  app.get("/", async (request, reply) => {
    const querySchema = z.object({
      student_id: z.uuid(),
    });

    try {
      const { student_id } = querySchema.parse(request.query);

      const goals = await prisma.goal.findMany({
        where: { student_id },
        orderBy: { created_at: "desc" },
        include: {
          student: {
            select: { id: true, name: true },
          },
        },
      });

      return reply.status(200).send(goals);
    } catch (error) {
      console.error("Error fetching goals:", error);
      return reply.status(500).send({ message: "Erro ao buscar metas" });
    }
  });

  app.post("/", async (request, reply) => {
    const { student_id } = request.params as { student_id: string };

    const bodySchema = z.object({
      title: z.string().min(1),
      description: z.string().optional(),
      status: z.enum(GoalStatus).default(GoalStatus.IN_PROGRESS),
      start_at: z.coerce.date().optional().nullable(),
      end_at: z.coerce.date().optional().nullable(),
    });

    try {
      const { title, description, status, start_at, end_at } = bodySchema.parse(
        request.body,
      );

      const goal = await prisma.goal.create({
        data: {
          student_id,
          title,
          description,
          status,
          start_at: start_at ?? undefined,
          end_at: end_at ?? undefined,
        },
      });

      return reply.status(201).send(goal);
    } catch (error) {
      console.error("Error creating goal:", error);
      return reply.status(500).send({ message: "Erro ao criar meta" });
    }
  });

  app.put("/:id", async (request, reply) => {
    const { id, student_id } = request.params as {
      id: string;
      student_id: string;
    };

    const bodySchema = z.object({
      title: z.string().min(1).optional(),
      description: z.string().optional().nullable(),
      status: z.enum(GoalStatus).optional(),
      start_at: z.coerce.date().optional().nullable(),
      end_at: z.coerce.date().optional().nullable(),
    });

    try {
      const { title, description, status, start_at, end_at } = bodySchema.parse(
        request.body,
      );

      const goal = await prisma.goal.update({
        where: { id, student_id },
        data: {
          title,
          description,
          status,
          start_at: start_at ?? undefined,
          end_at: end_at ?? undefined,
        },
      });

      return reply.status(200).send(goal);
    } catch (error) {
      console.error("Error updating goal:", error);
      return reply.status(500).send({ message: "Erro ao atualizar meta" });
    }
  });

  app.delete("/:id", async (request, reply) => {
    const { id, student_id } = request.params as {
      id: string;
      student_id: string;
    };

    try {
      await prisma.goal.delete({ where: { id, student_id } });

      return reply.status(200).send({ message: "Meta excluída com sucesso" });
    } catch (error) {
      console.error("Error deleting goal:", error);
      return reply.status(500).send({ message: "Erro ao excluir meta" });
    }
  });
}
