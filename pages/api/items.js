// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from "../../helpers";

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(db.menuItems);
  } else if (req.method === "POST") {
    const newItem = {
      name: req.body.name,
      price: req.body.price,
      cooks: [req.body.cook],
    };
    console.log(newItem);
    db.menuItems.push(newItem);
    res.status(200).json(newItem);
  }
}
