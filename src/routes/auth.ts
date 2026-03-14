import bcrypt from "bcrypt";
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function authRoutes(app: FastifyInstance) {
  app.post("/signin", async (request, reply) => {
    const bodySchema = z.object({
      email: z.email(),
      password: z.string(),
    });

    const { email, password } = bodySchema.parse(request.body);

    try {
      const user = await prisma.user.findFirstOrThrow({
        where: {
          email,
        },
      });

      const passwordMatch = await bcrypt.compare(password, user.password!);
      if (!passwordMatch) {
        return reply
          .status(400)
          .send({ message: "Email ou senha incorretos." });
      }

      const token = app.jwt.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        {
          sub: user.id,
          expiresIn: "1 day",
        },
      );

      return {
        token,
      };
    } catch (error) {
      return reply.status(500).send({ message: "Erro ao fazer login" });
    }
  });
}
