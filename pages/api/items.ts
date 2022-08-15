// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from "../../helpers";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // remove the next line to  stop the delay
    await new Promise((r) => setTimeout(() => r(""), 3000));
    res.status(200).json(db.menuItems);
  } else if (req.method === "POST") {
    const newItem = {
      name: req.body.name,
      price: req.body.price,
      cooks: [req.body.cook.toLowerCase()],
    };
    // remove the next line to stop the delay
    await new Promise((r) => setTimeout(() => r(""), 1000));
    console.log(newItem);
    db.menuItems.push(newItem);
    res.status(200).json(newItem);
  }
}
