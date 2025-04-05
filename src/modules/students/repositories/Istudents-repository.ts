import { Prisma, Student } from "@prisma/client";

export interface IStudentsRepository {
  create(data: Prisma.StudentCreateInput): Promise<Student>;
  update(data: Prisma.StudentUpdateInput): Promise<Student>;
  findByEmail(email:string): Promise<Student | null>;
  findById(id:string): Promise<Student | null>;
}
