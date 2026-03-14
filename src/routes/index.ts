import { FastifyInstance } from "fastify";
import { authRoutes } from "./auth";
import { goalRoutes } from "./goal";
import { lessonRoutes } from "./lesson";
import { userRoutes } from "./user";

export async function appRoutes(app: FastifyInstance) {
  app.register(authRoutes);
  app.register(userRoutes, { prefix: "/users" });
  app.register(goalRoutes, { prefix: "/:student_id/goals" });
  app.register(lessonRoutes, { prefix: "/:student_id/lessons" });
}
