
import { NextFunction, Request, Response } from "express";
import { prisma } from ".";

async function getNotes(req: Request, res: Response, next: NextFunction) {
    const notes = await prisma.note.findMany();
    res.json(notes);
}

async function getNote(req: Request, res: Response, next: NextFunction) {
    if (!req.params.id) {
        res.status(400).json({ error: 'Missing note id' });
        return;
    }
    const { id } = req.params;
    try {
        const note = await prisma.note.findUnique({
            where: { id: Number(id) },
        });
        res.json(note);
    } catch (error) {
        next(error);
    }
}

async function createNote(req: Request, res: Response, next: NextFunction) {
    if (!req.body.title || !req.body.content) {
        res.status(400).json({ error: 'Missing title or content' });
        return;
    }
    const { title, content } = req.body;
    try {
        const note = await prisma.note.create({
            data: {
                title,
                content,
            },
        });
        res.json(note);
    } catch (error) {
        next(error);
    }
}

async function updateNote(req: Request, res: Response, next: NextFunction) {
    if (!req.params.id) {
        res.status(400).json({ error: 'Missing note id' });
        return;
    }
    if (!req.body.title || !req.body.content) {
        res.status(400).json({ error: 'Missing title or content' });
        return;
    }
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const note = await prisma.note.update({
            where: { id: Number(id) },
            data: {
                title,
                content,
            },
        });
        res.json(note);
    } catch (error) {
        next(error);
    }
}

async function deleteNote(req: Request, res: Response, next: NextFunction) {
    if (!req.params.id) {
        res.status(400).json({ error: 'Missing note id' });
        return;
    }
    const { id } = req.params;
    try {
        const note = await prisma.note.delete({
            where: { id: Number(id) },
        });
        res.json(note);
    } catch (error) {
        next(error);
    }
}

export { createNote, deleteNote, getNote, getNotes, updateNote }