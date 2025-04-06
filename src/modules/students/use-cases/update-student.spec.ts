import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryStudentsRepository } from "../repositories/in-memory/in-memory-students-repository";
import { CreateStudentUseCase } from "./create-student";
import { UpdateStudentUseCase } from "./update-student";
import { DefaultError } from "@src/helpers/DefaultError";

let studentsRepository: InMemoryStudentsRepository;
let createStudent: CreateStudentUseCase;
let updateStudent: UpdateStudentUseCase;

describe("Update Student Use Case", () => {
  beforeEach(() => {
    studentsRepository = new InMemoryStudentsRepository();
    createStudent = new CreateStudentUseCase(studentsRepository);
    updateStudent = new UpdateStudentUseCase(studentsRepository);
  });

  it("should update the student's name and surname", async () => {
    const { createdStudent } = await createStudent.execute({
      nome: "Original",
      sobrenome: "Name",
      email: "original@example.com",
      senha: "12345678",
    });

    const { updatedStudent } = await updateStudent.execute({
      id: createdStudent.id,
      nome: "Updated",
      sobrenome: "User",
    });

    expect(updatedStudent.nome).toBe("Updated");
    expect(updatedStudent.sobrenome).toBe("User");
    expect(updatedStudent.id).toBe(createdStudent.id);
  });
});
