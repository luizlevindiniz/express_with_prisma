import { NextFunction, Request, Response } from "express";
import { prisma } from "..";

async function getUsers(req: Request, res: Response, next: NextFunction) {
  const users = await prisma.user.findMany();
  res.json(users);
}

async function getUser(req: Request, res: Response, next: NextFunction) {
  if (!req.params.id) {
    res.status(400).json({ error: "Missing User id" });
    return;
  }
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: String(id) },
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
}

async function createUser(req: Request, res: Response, next: NextFunction) {
  if (!req.body.name || !req.body.email) {
    res.status(400).json({ error: "Missing name or email" });
    return;
  }
  const { name, email } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
}

async function updateUser(req: Request, res: Response, next: NextFunction) {
  if (!req.params.id) {
    res.status(400).json({ error: "Missing User id" });
    return;
  }
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id: String(id) },
      data: {
        name,
        email,
      },
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req: Request, res: Response, next: NextFunction) {
  if (!req.params.id) {
    res.status(400).json({ error: "Missing User id" });
    return;
  }
  const { id } = req.params;
  try {
    const user = await prisma.user.delete({
      where: { id: String(id) },
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
}

export { createUser, deleteUser, getUser, getUsers, updateUser };
