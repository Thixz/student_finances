import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryStudentsRepository } from "../repositories/in-memory/in-memory-students-repository";
import { GetStudentProfileUseCase } from "./get-student-profile";
import { CreateStudentUseCase } from "./create-student";
import { DefaultError } from "@src/helpers/DefaultError";

let studentsRepository: InMemoryStudentsRepository;
let createStudent: CreateStudentUseCase;
let getStudentProfile: GetStudentProfileUseCase;

describe("Get Student Profile Use Case", () => {
  beforeEach(() => {
    studentsRepository = new InMemoryStudentsRepository();
    createStudent = new CreateStudentUseCase(studentsRepository);
    getStudentProfile = new GetStudentProfileUseCase(studentsRepository);
  });

  it("should be able to get a student profile by ID", async () => {
    const { createdStudent } = await createStudent.execute({
      nome: "Jane",
      sobrenome: "Doe",
      email: "jane.doe@gmail.com",
      senha: "janedoe123",
    });

    const { student } = await getStudentProfile.execute({
      student_id: createdStudent.id,
    });

    expect(student.id).toEqual(createdStudent.id);
    expect(student.email).toBe("jane.doe@gmail.com");
  });

  it("should not be able to get profile of non-existent student", async () => {
    await expect(() =>
      getStudentProfile.execute({
        student_id: "non-existent-id",
      })
    ).rejects.toBeInstanceOf(DefaultError);
  });
});
