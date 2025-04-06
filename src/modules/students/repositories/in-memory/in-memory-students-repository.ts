import { Prisma, Student } from "@prisma/client";
import { randomUUID } from "crypto";
import { IStudentsRepository } from "../Istudents-repository";

export class InMemoryStudentsRepository implements IStudentsRepository {
  private students: Student[] = [];

  async create(data: Prisma.StudentCreateInput): Promise<Student> {
    const student: Student = {
      id: randomUUID(),
      nome: data.nome,
      sobrenome: data.sobrenome,
      email: data.email,
      senha: data.senha,
    };

    this.students.push(student);
    return student;
  }

  async update(
    data: Prisma.StudentUpdateInput & { id: string }
  ): Promise<Student> {
    const index = this.students.findIndex((s) => s.id === data.id);
    if (index === -1) throw new Error("Student not found");

    const existing = this.students[index];

    const updated = {
      ...existing,
      ...data,
    } as Student;

    this.students[index] = updated;
    return updated;
  }

  async findByEmail(email: string): Promise<Student | null> {
    const student = this.students.find((s) => s.email === email);
    return student || null;
  }

  async findById(id: string): Promise<Student | null> {
    const student = this.students.find((s) => s.id === id);
    return student || null;
  }
}
