/** @format */
import express from "express";
import mongoose from "mongoose";
import PostRoutes from "./routes/posts.js";
const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use("/posts", PostRoutes);

const PORT = process.env.PORT || PORT;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT, console.log("Server started")))
  .catch((error) => {
    console.log(error.message);
  });
