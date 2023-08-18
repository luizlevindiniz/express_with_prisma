import { NextFunction, Request, Response } from "express";
import { prisma } from "..";

async function getEvents(req: Request, res: Response, next: NextFunction) {
  const events = await prisma.event.findMany();
  res.json(events);
}

async function getEvent(req: Request, res: Response, next: NextFunction) {
  if (!req.params.id) {
    res.status(400).json({ error: "Missing Event id" });
    return;
  }
  const { id } = req.params;
  try {
    const event = await prisma.event.findUnique({
      where: { id: String(id) },
    });
    res.json(event);
  } catch (error) {
    next(error);
  }
}

async function createEvent(req: Request, res: Response, next: NextFunction) {
  if (!req.body.eventOwnerId) {
    res.status(400).json({ error: "Missing event owner id" });
    return;
  }
  const { title, location, date, eventOwnerId, content } = req.body;
  try {
    const event = await prisma.event.create({
      data: {
        eventOwnerId,
        title,
        location,
        date,
        content,
      },
    });
    res.json(event);
  } catch (error) {
    next(error);
  }
}

async function updateEvent(req: Request, res: Response, next: NextFunction) {
  if (!req.params.id) {
    res.status(400).json({ error: "Missing Event id" });
    return;
  }
  if (!req.body.eventOwnerId) {
    res.status(400).json({ error: "Missing owner id" });
    return;
  }
  const { id } = req.params;
  const { title, location, date, content } = req.body;
  try {
    const event = await prisma.event.update({
      where: { id: String(id) },
      data: {
        content,
        title,
        location,
        date,
      },
    });
    res.json(event);
  } catch (error) {
    next(error);
  }
}

async function deleteEvent(req: Request, res: Response, next: NextFunction) {
  if (!req.params.id) {
    res.status(400).json({ error: "Missing Event id" });
    return;
  }
  const { id } = req.params;
  try {
    const event = await prisma.event.delete({
      where: { id: String(id) },
    });
    res.json(event);
  } catch (error) {
    next(error);
  }
}

export { createEvent, deleteEvent, getEvent, getEvents, updateEvent };
