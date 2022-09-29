import { Router, Request, Response } from "express";

const router = Router();

/**
 * Product routes
 */
router.get("/product", (req: Request, res: Response) => {
  res.json({ message: "product" });
});

router.get("/product/:id", (req: Request, res: Response) => {});

router.put("/product/:id", (req: Request, res: Response) => {});

router.post("/product", (req: Request, res: Response) => {});

router.delete("/product/:id", (req: Request, res: Response) => {});

/**
 * Update routes
 */

router.get("/update", (req: Request, res: Response) => {});

router.get("/update/:id", (req: Request, res: Response) => {});

router.post("/update", (req: Request, res: Response) => {});

router.put("/update/:id", (req: Request, res: Response) => {});

router.delete("/update/:id", (req: Request, res: Response) => {});

/**
 * Update Points routes
 */

router.get("/updatepoint", (req: Request, res: Response) => {});

router.get("/updatepoint/:id", (req: Request, res: Response) => {});

router.post("/updatepoint", (req: Request, res: Response) => {});

router.put("/updatepoint/:id", (req: Request, res: Response) => {});

router.delete("/updatepoint/:id", (req: Request, res: Response) => {});

export default router;
