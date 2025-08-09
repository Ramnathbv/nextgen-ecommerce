import { Router, Request, Response } from "express";
import { demoProducts } from "../data/products";

export const productsRouter = Router();

productsRouter.get("/products", (req: Request, res: Response) => {
  const page = Math.max(parseInt(String(req.query.page || 1), 10), 1);
  const limit = Math.max(parseInt(String(req.query.limit || 10), 10), 1);
  const search = String(req.query.search || "").toLowerCase();
  const category = String(req.query.category || "");
  const sort = String(req.query.sort || "");

  let filtered = demoProducts.filter((p) =>
    search ? p.name.toLowerCase().includes(search) : true
  );

  if (category) {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (sort === "price_asc") {
    filtered = filtered.slice().sort((a, b) => a.price - b.price);
  } else if (sort === "price_desc") {
    filtered = filtered.slice().sort((a, b) => b.price - a.price);
  }

  const total = filtered.length;
  const start = (page - 1) * limit;
  const paged = filtered.slice(start, start + limit);

  res.json({ success: true, data: paged, meta: { page, limit, total } });
});

productsRouter.get("/products/:id", (req: Request, res: Response) => {
  const product = demoProducts.find((p) => p.id === req.params.id);
  if (!product) {
    return res
      .status(404)
      .json({ success: false, error: "Product not found" });
  }
  return res.json({ success: true, data: product });
});


