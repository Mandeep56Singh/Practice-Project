import "dotenv/config";
import express, { Request, Response } from "express";
import "express-async-errors";
import todoRouter from "./routes/todo.routes.js";

import { errorHandler } from "./middleware/errorHandler.js";
import { routeNotFound } from "./middleware/routeNotFound.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

app.get("/", (_: Request, res: Response) => {
  res.send("Hello");
});
app.use("/api/todo", todoRouter);

app.use(routeNotFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`running app at http://localhost:${PORT}`);
});
