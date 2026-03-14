import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import multipart from "@fastify/multipart";
import fastify, { FastifyReply, FastifyRequest } from "fastify";
import fastifyRawBody from "fastify-raw-body";
import { ZodError } from "zod";
import { env } from "./env";
import { appRoutes } from "./routes";

export const app = fastify();

app.register(fastifyRawBody, {
  field: "rawBody",
  global: false,
  encoding: "utf8",
  runFirst: true,
});

app.register(multipart);

app.register(cors, {
  origin: true,
  methods: "*",
});

app.register(jwt, {
  secret: env.SERVER_SECRET,
});

app.decorate(
  "verifyAuth",
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (error) {
      return reply.status(401).send({ message: "Não autorizado" });
    }
  }
);

app.setErrorHandler(async (error, _, reply) => {
  if (error instanceof ZodError)
    return reply
      .status(400)
      .send({ message: "Erro de validação", issues: error.format() });

  if ((error as { statusCode?: number }).statusCode === 401)
    return reply.status(401).send({ message: "Não autorizado" });

  return reply.status(500).send({ message: "Erro interno do servidor", error });
});

declare module "fastify" {
  interface FastifyInstance {
    verifyAuth(request: FastifyRequest, reply: FastifyReply): Promise<void>;
  }
}

app.register(appRoutes);
