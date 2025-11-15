import express from "express";
import { Book } from "../models/bookmodel.js";
const Router = express.Router();

// post a book to database
Router.post("/", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send("Missing required book information");
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const book = await Book.create(newBook);
    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send("Error in creating book");
  }
});
// get all books from database

Router.get("/", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      Count: books.length,
      Data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for get one book by id
Router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);
    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for update a book by id
Router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send("Missing required book information");
    }
    const { id } = request.params;
    const result = await Book.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).send("Book not found");
    }

    return response.status(200).send("Book updated successfully");
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for delete a book by id
Router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).send("Book not found");
    }
    return response.status(200).send("Book deleted successfully");
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default Router;