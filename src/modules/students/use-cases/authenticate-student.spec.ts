import { DefaultError } from "@src/helpers/DefaultError";
import { compare, hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryStudentsRepository } from "../repositories/in-memory/in-memory-students-repository";
import { AuthenticateStudentUseCase } from "./authenticate-student";

let studentsRepository: InMemoryStudentsRepository;
let sut: AuthenticateStudentUseCase;

describe("Create Student Use Case", () => {
  beforeEach(() => {
    studentsRepository = new InMemoryStudentsRepository();
    sut = new AuthenticateStudentUseCase(studentsRepository);
  });

  it("should be able to authenticate a student", async () => {
    await studentsRepository.create({
        nome: "John",
        sobrenome: "Doe",
        email: "john.doe@gmail.com",
        senha: await hash("jhonjhon123", 6),
      });
  
      const { student } = await sut.execute({
        email: "john.doe@gmail.com",
        password: "jhonjhon123",
      });
  
      expect(student.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {
    expect(async () => {
      await sut.execute({
        email: "john.doe@gmail.com",
        password: "jhonjhon123",
      });
    }).rejects.toBeInstanceOf(DefaultError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    await studentsRepository.create({
        nome: "John",
        sobrenome: "Doe",
        email: "john.doe@gmail.com",
        senha: "jhonjhon123",
      });

    expect(async () => {
      await sut.execute({
        email: "john.doe@gmail.com",
        password: "jhonjones",
      });
    }).rejects.toBeInstanceOf(DefaultError);
  });
});
