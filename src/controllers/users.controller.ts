import { Request, Response } from "express";
import { dataSource } from "../config/ormconfig";
import { Books } from "../entities/books.entity";
import { Users } from "../entities/user.entity";

const usersController = {
  GET: async (req: Request, res: Response) => {
    try {
      const users = await dataSource.getRepository(Users).find({
        relations: {
          books: true,
        },
      });

      res.json(users);
    } catch (err) {
      console.log(err.message);
    }
  },
  POST: async (req: Request, res: Response) => {
    try {
      const { firstName, lastName, age, booksId } = req.body;

      const newUser = new Users();

      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.age = age;

      const findBook = await dataSource
        .getRepository(Books)
        .find({ where: { id: booksId } });

      newUser.books = findBook;

      await dataSource.manager.save(newUser);

      res.json(newUser);
    } catch (err) {
      console.log(err);
    }
  },
  ADD_BOOK: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { booksId } = req.body;

    const users = await dataSource.getRepository(Users).find({
      relations: {
        books: true,
      },
    });

    const findUser = users.find((e) => e.id == Number(id));

    const findBook = await dataSource
      .getRepository(Books)
      .findOne({ where: { id: booksId } });

    const date = new Date();
    const year = date.getFullYear().toString();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    findUser.books.push(findBook);
    findUser.updatedAt = year + "-" + month + "-" + day;

    await dataSource.manager.save(findUser);

    res.json(findUser);
  },
  PUT: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { firstName, lastName, age, isFree } = req.body;

    const date = new Date();
    const year = date.getFullYear().toString();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    const updateUser = await dataSource
      .createQueryBuilder()
      .update(Users)
      .set({ firstName, lastName, age, isFree, updatedAt: year + "-" + month + "-" + day })
      .where("id = :id", { id })
      .returning(["firstName", "lastName", "age", "isFree"])
      .execute();

    res.json(updateUser);
  },
  DELETE: async(req: Request, res: Response) =>{
    const { id } = req.params;

    const deleteUser = await dataSource
      .createQueryBuilder()
      .delete()
      .from(Users)
      .where("id = :id", { id })
      .execute();

    res.json(deleteUser);
  }
};

export default usersController;
