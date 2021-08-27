/** @format */
import express from "express";
import mongoose from "mongoose";
import PostRoutes from "./routes/posts.js";
const app = express();

app.use("/posts", PostRoutes);
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

const CONNECTION_URL =
  "mongodb+srv://ayushikaBansal:ayushikaBansal123@cluster0.tprhj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT, console.log("Server started")))
  .catch((error) => {
    console.log(error.message);
  });
