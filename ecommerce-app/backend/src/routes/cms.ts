import { Router, Request, Response } from "express";

export const cmsRouter = Router();

const pages: Record<string, { title: string; slug: string; content: string }> = {
  about: {
    title: "About Us",
    slug: "about",
    content: "This is a demo About page powered by a placeholder store.",
  },
  faq: {
    title: "FAQ",
    slug: "faq",
    content: "Frequently asked questions will appear here.",
  },
  terms: {
    title: "Terms & Conditions",
    slug: "terms",
    content: "These are not legal terms, just demo content.",
  },
};

cmsRouter.get("/pages/:slug", (req: Request, res: Response) => {
  const page = pages[req.params.slug];
  if (!page) {
    return res.status(404).json({ success: false, error: "Page not found" });
  }
  res.json({ success: true, data: page });
});


