import express from "express";
import dontenv from "dotenv";
import cookieParser from "cookie-parser";
dontenv.config();
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
const port = process.env.PORT || 5000;

connectDB();
const app = express();
//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //this is for the form url enocded on postman

//Cookie parser middleware
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server ruuning on port ${port}`));
