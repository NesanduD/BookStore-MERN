import express, { response } from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";
const app = express();
import {Book} from "./models/bookmodel.js";

app.use(express.json());

app.get("/", (request,response) => {
        console.log(request)
        return response.status(234).send("Hello from backend");
})
// post a book to database
app.post('/books', async(request, response) => {
    try 
    {
        if(!request.body.title ||!request.body.author ||!request.body.publishYear)
            {
                return response.status(400).send("Missing required book information");
            }
        const newBook = 
            {
                title: request.body.title,
                author: request.body.author,
                publishYear: request.body.publishYear
            };

            const book = await Book.create(newBook);
            return response.status(201).send(book);
        }
    catch (error) {
        console.log(error.message);
        response.status(500).send("Error in creating book");
    }
});
// get all books from database

app.get('/books', async(request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json({
            Count: books.length,
            Data : books
        });
    }catch (error) 
    {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }});

    //Route for get one book by id
    app.get('/books/:id', async(request, response) => {
        try {
            const {id} = request.params;
            const book = await Book.findById(id);
            return response.status(200).json(book);
        }catch (error)
        {
            console.log(error.message);
            response.status(500).send({message: error.message});
        }
    });

    // Route for update a book by id
    app.put('/books/:id', async(request, response) => {
        try {
            if (
                !request.body.title ||
                !request.body.author ||
                !request.body.publishYear
            ) {
                return response.status(400).send("Missing required book information");
            };
            const {id} = request.params;
            const result = await Book.findByIdAndUpdate(id, request.body);

            if (!result) {
                return response.status(404).send("Book not found");
            }
            
            return response.status(200).send("Book updated successfully");  

        }catch (error) {
            console.log(error.message);
            response.status(500).send({message: error.message});
        }
            });

mongoose.connect(mongoDBURL)
    .then(() => {
        console.log("Connected to Database(MongoDB)");
        app.listen(PORT, () => {
            console.log(`App is listening on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    }  );