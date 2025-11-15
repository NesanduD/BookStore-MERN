import express, { response } from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";
const app = express();
import {Book} from "./models/bookmodel.js";
import booksRoute from "./routes/booksRoute.js";

app.use(express.json());

app.get("/", (request,response) => {
        console.log(request)
        return response.status(234).send("Hello from backend");
})

app.use("/api", booksRoute);

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