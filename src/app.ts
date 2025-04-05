import fastify from "fastify";
import { env } from "../env";
import { ZodError } from "zod";
import { DefaultError } from "./helpers/DefaultError";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import { studentsRoutes } from "./http/controllers/students/routes";

export const app = fastify();

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors,{origin:"*"})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
   cookieName: "refreshToken",
   signed:false
  },
  sign: {
    expiresIn: "5m",
  }
});

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Students Financial Simulation API",
      description: "Documentation of Students Financial Simulation API",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

app.register(fastifyCookie)

app.register(studentsRoutes)







app.setErrorHandler((error, _, reply) => {
  console.log(error)
  if (error instanceof ZodError) {
    const messages = error.errors.map((err) => err.message);

    return reply.status(400).send({
      message: "Validation error.",
      issues: messages,
    });
  }

  if (error instanceof DefaultError) {
    return reply
      .status(error.statusCode)
      .send({ message: "Handled error.", issues: [error.issues] });
  }

  if (error.code === "FST_ERR_VALIDATION") {
    const messages = error.validation!.map((issue: any) => {
      return `${issue.instancePath}: ${issue.message}`;
    });
  
    return reply.status(400).send({
      message: "Validation error.",
      issues: messages,
    });
  }

  return reply
    .status(500)
    .send({ message: "Internal server error", issues: error.message });
});
