import { Student } from "@prisma/client";
import { IStudentsRepository } from "../repositories/Istudents-repository";
import { DefaultError } from "@src/helpers/DefaultError";

interface GetStudentProfileUseCaseRequest {
  student_id: string;
}

interface GetStudentProfileUseCaseResponse {
  student: Student;
}

export class GetStudentProfileUseCase {
  constructor(private studentsRepository: IStudentsRepository) {}

  async execute({
    student_id,
  }: GetStudentProfileUseCaseRequest): Promise<GetStudentProfileUseCaseResponse> {
    const student = await this.studentsRepository.findById(student_id);

    if (!student) {
      throw new DefaultError("Resource not found.", 400);
    }

    return { student };
  }
}
