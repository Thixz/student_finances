import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryStudentsRepository } from "../repositories/in-memory/in-memory-students-repository";
import { CreateStudentUseCase } from "./create-student";
import { UpdateStudentPasswordUseCase } from "./update-student-password";
import { DefaultError } from "@src/helpers/DefaultError";
import { compare } from "bcryptjs";

let studentsRepository: InMemoryStudentsRepository;
let createStudent: CreateStudentUseCase;
let updatePassword: UpdateStudentPasswordUseCase;

describe("Update Student Password Use Case", () => {
  beforeEach(() => {
    studentsRepository = new InMemoryStudentsRepository();
    createStudent = new CreateStudentUseCase(studentsRepository);
    updatePassword = new UpdateStudentPasswordUseCase(studentsRepository);
  });

  it("should be able to update the student password", async () => {
    const { createdStudent } = await createStudent.execute({
      nome: "Alice",
      sobrenome: "Silva",
      email: "alice@example.com",
      senha: "oldPassword123",
    });

    const updatedStudent = await updatePassword.execute({
      id: createdStudent.id,
      old_password: "oldPassword123",
      new_password: "newPassword456",
    });

    const passwordMatches = await compare("newPassword456", updatedStudent.senha);

    expect(passwordMatches).toBe(true);
  });

  it("should not allow password update with wrong current password", async () => {
    const { createdStudent } = await createStudent.execute({
      nome: "Bob",
      sobrenome: "Marley",
      email: "bob@example.com",
      senha: "correctPassword",
    });

    await expect(() =>
      updatePassword.execute({
        id: createdStudent.id,
        old_password: "wrongPassword",
        new_password: "newPassword123",
      })
    ).rejects.toBeInstanceOf(DefaultError);
  });

  it("should not update password of a non-existent student", async () => {
    await expect(() =>
      updatePassword.execute({
        id: "non-existent-id",
        old_password: "any",
        new_password: "any",
      })
    ).rejects.toBeInstanceOf(DefaultError);
  });
});
