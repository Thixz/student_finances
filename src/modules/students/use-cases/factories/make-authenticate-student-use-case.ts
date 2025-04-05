import { PrismaStudentsRepository } from "../../repositories/prisma/prisma-students-repository";
import { AuthenticateStudentUseCase } from "../authenticate-student";

export function makeAuthenticateStudentUseCase() {
  const prismaStudentsRepository = new PrismaStudentsRepository();
  const authenticateStudentUseCase = new AuthenticateStudentUseCase(
    prismaStudentsRepository
  );

  return authenticateStudentUseCase;
}
