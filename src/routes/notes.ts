import { Router } from "express";

import {
  createNote,
  deleteNote,
  getNote,
  getNotes,
  updateNote,
} from "../controllers/notes.controller";

export const noteRouter = Router();

noteRouter.get("/notes", getNotes);
noteRouter.get("/notes/:id", getNote);
noteRouter.post("/notes", createNote);
noteRouter.put("/notes/:id", updateNote);
noteRouter.delete("/notes/:id", deleteNote);
