import { DefaultError } from "@src/helpers/DefaultError";
import { FastifyRequest, FastifyReply } from "fastify";

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
  try {
    if (!request.headers.authorization) { // Evita que o navegador ou o swagger assumam o refreshToken como authorization automaticamente
      throw Error("");
    }

    await request.jwtVerify();
  } catch (error) {
    throw new DefaultError("Unauthorized", 401);
  }
}
