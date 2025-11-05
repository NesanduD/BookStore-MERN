import express from "express";
import {PORT, mongoDBURL} from "./config.js";
const app = express();

import mongoose from "mongoose";

app.get("/", (request,response) => {
        console.log(request)
        return response.status(234).send("Hello from backend");
})


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