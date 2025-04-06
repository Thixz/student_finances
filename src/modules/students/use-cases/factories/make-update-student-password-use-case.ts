import { PrismaStudentsRepository } from "../../repositories/prisma/prisma-students-repository";
import { UpdateStudentPasswordUseCase } from "../update-student-password";

export function makeUpdateStudentPasswordUseCase() {
  const prismaStudentsRepository = new PrismaStudentsRepository();
  const updateStudentUseCase = new UpdateStudentPasswordUseCase(
    prismaStudentsRepository
  );

  return updateStudentUseCase;
}
