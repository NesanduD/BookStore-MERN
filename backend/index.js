import express from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";
const app = express();
import {Book} from "./models/bookmodel.js";

app.use(express.json());

app.get("/", (request,response) => {
        console.log(request)
        return response.status(234).send("Hello from backend");
})

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