import "dotenv/config";
import express, { Request, Response } from "express";
import todoRouter from "./routes/todo.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

app.get("/", (_: Request, res: Response) => {
  res.send("Hello");
});
app.use("/api/todo", todoRouter);
app.listen(PORT, () => {
  console.log(`running app at http://localhost:${PORT}`);
});
