import crypto from 'crypto'
import { Request, Response } from 'express';

export default async function home(req: Request, res: Response) {
  if (req.query?.name === "salih") {
    res.redirect("/1")
  }

  const id = crypto.randomUUID()

  return { data: { name: "sailh home page", id, content: req.get("content-type") } }
}
