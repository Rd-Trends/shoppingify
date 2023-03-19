import { NextApiResponse } from "next";
import nextConnect from "next-connect";

import { NextApiReq } from "../../../interface";
import auth from "../../../middleware/auth";
import init from "../../../middleware/init";
import Item, { itemSchema } from "../../../models/item";

const handler = nextConnect();

handler
  .use(init)
  .use(auth)
  .get(async (req: NextApiReq, res: NextApiResponse, next) => {
    try {
      const userItems = await Item.find({ owner: req.user._id });
      return res.status(200).json(userItems);
    } catch (err) {
      res.status(500).send("an error occured");
    }
  })
  .post(async (req: NextApiReq, res: NextApiResponse, next) => {
    try {
      const { name, category, note, image } = req.body;

      const newItem = new Item({
        name,
        note,
        image,
        category,
        owner: req.user._id,
      });

      await newItem.save();

      res.status(201).json(newItem);
    } catch (err) {
      throw err;
    }
  });

export default handler;
