import { FastifyInstance } from "fastify";
import { authRoutes } from "./auth";

export async function appRoutes(app: FastifyInstance) {
  app.register(authRoutes);
}
