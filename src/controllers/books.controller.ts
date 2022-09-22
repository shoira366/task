import { Request, Response } from "express";
import { dataSource } from "../config/ormconfig";
import { Books } from "../entities/books.entity";

const booksController = {
  GET: async (req: Request, res: Response) => {
    try {
      const books = await dataSource.getRepository(Books).find({
        relations: {
          users: true,
        },
      });

      res.json(books);
    } catch (err) {
      throw new Error();
    }
  },
  POST: async (req: Request, res: Response) => {
    try {
      const { title, author } = req.body;

      const newBook = await dataSource
        .createQueryBuilder()
        .insert()
        .into(Books)
        .values({ title, author })
        .returning(["id", "title", "author", "createdAt"])
        .execute();

      res.json(newBook);
    } catch (err) {
      throw new Error();
    }
  },
  PUT: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, author } = req.body;

    const updateBook = await dataSource
      .createQueryBuilder()
      .update(Books)
      .set({ title, author })
      .where("id = :id", { id })
      .returning(["id", "title", "author", "isFree"])
      .execute();

    res.json(updateBook);
  },
  DELETE: async (req: Request, res: Response) => {
    const { id } = req.params;

    const deleteBook = await dataSource
      .createQueryBuilder()
      .delete()
      .from(Books)
      .where("id = :id", { id })
      .execute();

    res.json(deleteBook);
  }
};

export default booksController;
