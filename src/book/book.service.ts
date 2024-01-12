import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Book } from './book.model';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async getAllBook(): Promise<Book[]> {
    return this.prisma.book.findMany();
  }

  async getBook(id: number): Promise<Book | null> {
    return this.prisma.book.findUnique({ where: { id: id } });
  }

  async create(data: Book): Promise<Book> {
    return this.prisma.book.create({
      data,
    });
  }

  async update(id: number, data: Book): Promise<Book> {
    return this.prisma.book.update({
      where: {
        id: id,
      },
      data: { title: data.title, description: data.description },
    });
  }

  async delete(id: number): Promise<Book> {
    return this.prisma.book.delete({ where: { id } });
  }
}
