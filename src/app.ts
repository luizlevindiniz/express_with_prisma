import express, { Request, Response, NextFunction } from "express";
import { noteRouter } from "./notes";
import cors from "cors";

export function createApp() {
  const app = express();

  app.use(express.json());

  app.use(cors()); /*  prevent cors */

  app.get("/health", (req, res) => res.status(200).send("OK"));

  app.use(noteRouter);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
  });

  return app;
}
