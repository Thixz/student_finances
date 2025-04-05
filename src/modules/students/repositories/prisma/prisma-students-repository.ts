import { Prisma, Student } from "@prisma/client";
import { prisma } from "@src/lib/prisma";
import { IStudentsRepository } from "../Istudents-repository";

export class PrismaStudentsRepository implements IStudentsRepository {
  async findById(id: string): Promise<Student | null> {
    return await prisma.student.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<Student | null> {
    return await prisma.student.findUnique({ where: { email } });
  }

  async create(data: Prisma.StudentCreateInput): Promise<Student> {
    return await prisma.student.create({
      data,
    });
  }

  async update(
    data: Prisma.StudentUpdateInput & { id: string }
  ): Promise<Student> {
    return await prisma.student.update({
      where: { id: data.id },
      data,
    });
  }
}
