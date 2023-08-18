import { NextFunction, Request, Response } from "express";
import { prisma } from "..";

async function getTickets(req: Request, res: Response, next: NextFunction) {
  const tickets = await prisma.ticket.findMany();
  res.json(tickets);
}

async function getTicket(req: Request, res: Response, next: NextFunction) {
  if (!req.params.id) {
    res.status(400).json({ error: "Missing Ticket id" });
    return;
  }
  const { id } = req.params;
  try {
    const ticket = await prisma.ticket.findUnique({
      where: { id: String(id) },
    });
    res.json(ticket);
  } catch (error) {
    next(error);
  }
}

async function createTicket(req: Request, res: Response, next: NextFunction) {
  if (!req.body.ticketOwnerId || !req.body.eventId) {
    res.status(400).json({ error: "Missing owner id or event id" });
    return;
  }
  const { content, ticketOwnerId, eventId, price } = req.body;
  try {
    const ticket = await prisma.ticket.create({
      data: {
        ticketOwnerId,
        content,
        eventId,
        price,
      },
    });
    res.json(ticket);
  } catch (error) {
    next(error);
  }
}

async function updateTicket(req: Request, res: Response, next: NextFunction) {
  if (!req.params.id) {
    res.status(400).json({ error: "Missing Ticket id" });
    return;
  }
  if (!req.body.ticketOwnerId || !req.body.eventId) {
    res.status(400).json({ error: "Missing owner id or event id" });
    return;
  }
  const { id } = req.params;
  const { content, price } = req.body;
  try {
    const ticket = await prisma.ticket.update({
      where: { id: String(id) },
      data: {
        content,
        price,
      },
    });
    res.json(ticket);
  } catch (error) {
    next(error);
  }
}

async function deleteTicket(req: Request, res: Response, next: NextFunction) {
  if (!req.params.id) {
    res.status(400).json({ error: "Missing Ticket id" });
    return;
  }
  const { id } = req.params;
  try {
    const ticket = await prisma.ticket.delete({
      where: { id: String(id) },
    });
    res.json(ticket);
  } catch (error) {
    next(error);
  }
}

export { createTicket, deleteTicket, getTicket, getTickets, updateTicket };
