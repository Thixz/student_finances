import { PrismaStudentsRepository } from "../../repositories/prisma/prisma-students-repository";
import { GetStudentProfileUseCase } from "../get-student-profile";

export function makeGetStudentUseCase() {
  const prismaStudentsRepository = new PrismaStudentsRepository();
  const getStudentUseCase = new GetStudentProfileUseCase(
    prismaStudentsRepository
  );

  return getStudentUseCase;
}
