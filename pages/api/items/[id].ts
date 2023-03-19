import { NextApiResponse } from "next";
import nextConnect from "next-connect";

import { item, NextApiReq } from "../../../interface";
import auth from "../../../middleware/auth";
import init from "../../../middleware/init";
import Item from "../../../models/item";

const handler = nextConnect();

handler
  .use(init)
  .use(auth)
  .get(async (req: NextApiReq, res: NextApiResponse, next) => {
    try {
      const { id } = req.query;
      const item = Item.findById(id);
      if (item) return res.status(200).json(item);
      else return res.status(404).send("no item with this ID exists");
    } catch (err) {
      res.status(500).send("an error occured");
    }
  })
  .delete(async (req: NextApiReq, res: NextApiResponse, next) => {
    try {
      const { id } = req.query;
      const ItemModel = await Item.findById(id);
      await ItemModel.deleteOne();
      // const sh = await ShoppingList.updateMany(
      //   { "items.item": id },
      //   { $pull: { items: { item: id } } },
      //   { new: true }
      // );

      res.status(200).send("item deleted successfully");
    } catch (err) {
      throw err;
    }
  });

export default handler;
