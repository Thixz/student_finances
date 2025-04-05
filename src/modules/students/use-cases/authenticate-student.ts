import { DefaultError } from "@src/helpers/DefaultError";
import { IStudentsRepository } from "../repositories/Istudents-repository";
import { compare } from "bcryptjs";
import { Student } from "@prisma/client";

interface AuthenticateStudentUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateStudentUseCaseResponse {
  student: Student;
}

export class AuthenticateStudentUseCase {
  constructor(private studentsRepository: IStudentsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateStudentUseCaseRequest): Promise<AuthenticateStudentUseCaseResponse> {
    const student = await this.studentsRepository.findByEmail(email);

    if (!student) {
      throw new DefaultError("Invalid credentials.", 400);
    }

    const doesPasswordMatches = await compare(password, student.senha);

    if (!doesPasswordMatches) {
      throw new DefaultError("Invalid credentials.", 400);
    }

    return { student };
  }
}
