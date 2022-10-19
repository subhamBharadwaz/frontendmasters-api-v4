import { Request, Response } from "express";
import prisma from "../db";
import { IReqUser } from "../interfaces/user";

// Get all updates
export const getUpdates = async (req: IReqUser, res: Response) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });
  //@ts-ignore
  const updates = products.reduce((allUpdates, products) => {
    return [...allUpdates, ...products.updates];
  }, []);
  res.status(200).json({ data: updates });
};

// Get one update
export const getOneUpdate = async (req: Request, res: Response) => {
  const update = await prisma.update.findFirst({
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json({ data: update });
};

// Create  update
export const createUpdate = async (req: Request, res: Response) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.productId,
    },
  });

  if (!product) {
    // does not belong to user
    return res.status(401).json({ message: "nope" });
  }

  const update = await prisma.update.create({
    //@ts-ignore
    data: {
      title: req.body.title,
      body: req.body.body,
      status: req.body.status,
      version: req.body.version,
      product: { connect: { id: product.id } },
    },
  });

  res.status(201).json({ data: update });
};

// Update update
export const updateUpdate = async (req: IReqUser, res: Response) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  //@ts-ignore
  const updates = products.reduce((allUpdates, products) => {
    return [...allUpdates, ...products.updates];
  }, []);

  //@ts-ignore
  const match = updates.find((update) => update.id === req.params.id);

  if (!match) {
    // handle this
    return res.json({ message: "nope" });
  }

  const updatedUpdate = await prisma.update.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });

  res.status(201).json({ data: updatedUpdate });
};

// Delete update
export const deleteUpdate = async (req: IReqUser, res: Response) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  //@ts-ignore
  const updates = products.reduce((allUpdates, products) => {
    return [...allUpdates, ...products.updates];
  }, []);

  //@ts-ignore
  const match = updates.find((update) => update.id === req.params.id);

  if (!match) {
    // handle this
    return res.json({ message: "nope" });
  }

  const deleted = await prisma.update.delete({
    where: {
      id: req.params.id,
    },
  });

  res.status(201).json({ data: deleted });
};
