import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryStudentsRepository } from "../repositories/in-memory/in-memory-students-repository";
import { CreateStudentUseCase } from "./create-student";
import { DefaultError } from "@src/helpers/DefaultError";
import { compare } from "bcryptjs";

let studentsRepository: InMemoryStudentsRepository;
let sut: CreateStudentUseCase;

describe("Create Student Use Case", () => {
  beforeEach(() => {
    studentsRepository = new InMemoryStudentsRepository();
    sut = new CreateStudentUseCase(studentsRepository);
  });

  it("should be able to create a student", async () => {
    const { createdStudent } = await sut.execute({
      nome: "John",
      sobrenome: "Doe",
      email: "john.doe@gmail.com",
      senha: "jhonjhon123",
    });

    expect(createdStudent.id).toEqual(expect.any(String));
  });

  it("should hash user password upon registration", async () => {
    const { createdStudent } = await sut.execute({
      nome: "John",
      sobrenome: "Doe",
      email: "john.doe@gmail.com",
      senha: "jhonjhon123",
    });

    const isPasswordCorrectlyHashed = await compare(
      "jhonjhon123",
      createdStudent.senha
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register with same email twice", async () => {
    const email = "john.doe@gmail.com";

    const { createdStudent } = await sut.execute({
      nome: "John",
      sobrenome: "Doe",
      email,
      senha: "jhonjhon123",
    });

    expect(async () => {
      await sut.execute({
        nome: "John",
        sobrenome: "Doe",
        email,
        senha: "jhonjhon123",
      });
    }).rejects.toBeInstanceOf(DefaultError);
  });
});
