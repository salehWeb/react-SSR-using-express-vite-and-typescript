import crypto from 'crypto'
import { Request, Response } from 'express';
import { LoaderType } from '../types';

export default async function homeLoader(req: Request, res: Response) {
  if (req.query?.name === "salih") {
    res.redirect("/1")
  }

  const id = crypto.randomUUID()

  return { data: { name: "sailh dhaifullah HOME PAGE", id, content: req.get("content-type") } }
}

export const homeHead = (args: LoaderType<typeof homeLoader>) => {
  return (
    <>
      <title>{`home head - ${args.data.id}`}</title>
      <meta rel='description' content={args.data.name} />
    </>
  )
}
