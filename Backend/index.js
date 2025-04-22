import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Database/Config.js";
import userRouter from "./Routers/UserRoute.js";


dotenv.config();
const app = express();

//middlewares
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
//Db connection
connectDB();
//Default route
app.get("/", (req, res) => {
  res.status(200).send("Hi welcome to API");
});

//API routes
app.use("/api/user", userRouter);
//listen
app.listen(process.env.PORT, () => {
  console.log("App is started and running on the port");
});


