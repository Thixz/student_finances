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

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
   cookieName: "refreshToken",
   signed:false
  },
  sign: {
    expiresIn: "10m",
  }
});

app.register(fastifyCookie)

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors,{origin:"*"})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Bank API",
      description: "Documentação da API Bank",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  routePrefix: "/swagger",
});







app.setErrorHandler((error, _, reply) => {
  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO: Here we shouyld log to and external tool like DataDog/Sentry....
  }

  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });
  }

  if (error instanceof DefaultError) {
    return reply
      .status(error.statusCode)
      .send({ message: "Handled error.", issues: error.issues });
  }

  return reply
    .status(500)
    .send({ message: "Internal server error", issues: error.message });
});
