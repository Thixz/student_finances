import { PrismaStudentsRepository } from "../../repositories/prisma/prisma-students-repository";
import { UpdateStudentUseCase } from "../update-student";

export function makeUpdateStudentUseCase() {
  const prismaStudentsRepository = new PrismaStudentsRepository();
  const updateStudentUseCase = new UpdateStudentUseCase(
    prismaStudentsRepository
  );

  return updateStudentUseCase;
}
