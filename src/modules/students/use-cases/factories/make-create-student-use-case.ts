import { PrismaStudentsRepository } from "../../repositories/prisma/prisma-students-repository";
import { CreateStudentUseCase } from "../create-student";

export function makeCreateStudentUseCase() {
  const prismaStudentsRepository = new PrismaStudentsRepository();
  const createStudentUseCase = new CreateStudentUseCase(
    prismaStudentsRepository
  );

  return createStudentUseCase;
}
