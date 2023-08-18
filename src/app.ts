import express, { Request, Response, NextFunction } from "express";
import { noteRouter } from "./routes/notes";
import { ticketRouter } from "./routes/tickets";
import { eventRouter } from "./routes/events";
import { userRouter } from "./routes/users";
import cors from "cors";

export function createApp() {
  const app = express();

  app.use(express.json());

  app.use(cors()); /*  prevent cors */

  app.get("/health", (req, res) => res.status(200).send("OK"));

  app.use(noteRouter);
  app.use(ticketRouter);
  app.use(userRouter);
  app.use(eventRouter);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
  });

  return app;
}
