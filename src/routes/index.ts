import { FastifyInstance } from "fastify";
import { authRoutes } from "./auth";
import { goalRoutes } from "./goal";
import { userRoutes } from "./user";

export async function appRoutes(app: FastifyInstance) {
  app.register(authRoutes);
  app.register(userRoutes, { prefix: "/users" });
  app.register(goalRoutes, { prefix: "/:student_id/goals" });
}
