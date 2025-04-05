import { DefaultError } from "@src/helpers/DefaultError";
import { FastifyRequest, FastifyReply } from "fastify";

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
    try {
      await request.jwtVerify();
    } catch (error) {
      throw new DefaultError("Unauthorized", 401);
    }
  }