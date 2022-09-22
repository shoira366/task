import { Router } from "express";
const router = Router()

import usersController from "../controllers/users.controller";
import booksController from "../controllers/books.controller"

router
    .get('/users', usersController.GET)
    .post('/newUser', usersController.POST)
    .put('/addBook/:id', usersController.ADD_BOOK)
    .put('/updateUser/:id', usersController.PUT)
    .delete('/deleteUser/:id', usersController.DELETE)
    .get('/books', booksController.GET)
    .post('/newBook', booksController.POST)
    .put('/updateBook', booksController.PUT)
    .delete('/deleteBook/:id', booksController.DELETE)

export default router