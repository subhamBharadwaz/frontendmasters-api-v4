import { Request, Response } from "express";
import prisma from "../db";
import { IReqUser } from "../interfaces/user";

// Get all products
export const getProducts = async (req: IReqUser, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      products: true,
    },
  });

  res.status(200).json({ data: user?.products });
  return;
};

// Get one product
export const getOneProduct = async (req: IReqUser, res: Response) => {
  const id = req.params.id;

  const product = await prisma.product.findFirst({
    where: {
      id,
      belongsToId: req.user.id,
    },
  });

  res.status(200).json({ data: product });
  return;
};

// Create product
export const createProduct = async (req: IReqUser, res: Response) => {
  const product = await prisma.product.create({
    data: {
      name: req.body.name,
      belongsToId: req.user.id,
    },
  });

  res.status(201).json({ data: product });
};

// Update product
export const updateProduct = async (req: IReqUser, res: Response) => {
  const updated = await prisma.product.update({
    where: {
      id_belongsToId: {
        id: req.params.id,
        belongsToId: req.user.id,
      },
    },
    data: {
      name: req.body.name,
    },
  });

  res.status(201).json({ data: updated });
};

// Delete product
export const deleteProduct = async (req: IReqUser, res: Response) => {
  const deleted = await prisma.product.delete({
    where: {
      id_belongsToId: {
        id: req.params.id,
        belongsToId: req.user.id,
      },
    },
  });

  res.status(200).json({ data: deleted });
};
