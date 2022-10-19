import { Router, Request, Response } from "express";
import { body } from "express-validator";
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from "./handlers/product";
import {
  createUpdate,
  deleteUpdate,
  getOneUpdate,
  getUpdates,
  updateUpdate,
} from "./handlers/update";
import { handleInputErrors } from "./modules/middleware";

const router = Router();

/**
 * Product routes
 */
router.get("/product", getProducts);

router.get("/product/:id", getOneProduct);

router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrors,
  updateProduct
);

router.post(
  "/product",
  body("name").isString(),
  handleInputErrors,
  createProduct
);

router.delete("/product/:id", deleteProduct);

/**
 * Update routes
 */

router.get("/update", getUpdates);

router.get("/update/:id", getOneUpdate);

router.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString(),
  body("productId").exists().isString(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
  body("version").optional(),

  handleInputErrors,
  createUpdate
);

router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
  body("version").optional(),

  handleInputErrors,
  updateUpdate
);

router.delete("/update/:id", deleteUpdate);

/**
 * Update Points routes
 */

router.get("/updatepoint", (req: Request, res: Response) => {});

router.get("/updatepoint/:id", (req: Request, res: Response) => {});

router.post(
  "/updatepoint",
  body("name").exists().isString(),
  body("description").exists().isString(),
  body("updateId").exists().isString(),
  handleInputErrors,
  (req: Request, res: Response) => {}
);

router.put(
  "/updatepoint/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  handleInputErrors,
  (req: Request, res: Response) => {}
);

router.delete("/updatepoint/:id", (req: Request, res: Response) => {});

export default router;
