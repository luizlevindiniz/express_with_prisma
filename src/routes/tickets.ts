import { Router } from "express";

import {
  createTicket,
  deleteTicket,
  getTicket,
  getTickets,
  updateTicket,
} from "../controllers/tickets.controller";

export const ticketRouter = Router();

ticketRouter.get("/tickets", getTickets);
ticketRouter.get("/tickets/:id", getTicket);
ticketRouter.post("/tickets", createTicket);
ticketRouter.put("/tickets/:id", updateTicket);
ticketRouter.delete("/tickets/:id", deleteTicket);
