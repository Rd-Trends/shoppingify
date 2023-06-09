import { NextApiResponse } from "next";
import nextConnect from "next-connect";

import { item, NextApiReq, shoppingList } from "../../../interface";
import auth from "../../../middleware/auth";
import init from "../../../middleware/init";
import Item from "../../../models/item";
import ShoppingList from "../../../models/_shoppingList";

const handler = nextConnect();

handler
  .use(init)
  .use(auth)
  .get(async (req: NextApiReq, res: NextApiResponse, next) => {
    try {
      const { id } = req.query;
      const shoppingList = await ShoppingList.findById(id).populate(
        "items.item",
        "",
        Item
      );
      if (!shoppingList) {
        return res.status(404).send("No shopping list with this ID was found");
      }
      return res.status(200).json(shoppingList);
    } catch (err) {
      throw err;
    }
  })
  .patch(async (req: NextApiReq, res: NextApiResponse, next) => {
    try {
      const { id } = req.query;
      const { items, status, name } = req.body;

      let update: { items?: item[]; status?: boolean; name?: string } = {};
      if (items) {
        update.items = items;
      }
      if (status) {
        update.status = status;
      }
      if (name) {
        update.name = name;
      }

      const updatedShoppingList = await ShoppingList.findOneAndUpdate(
        { _id: id },
        update,
        { new: true }
      )
        .populate("items.item")
        .populate("items.item.category");

      return res.status(200).json(updatedShoppingList);
    } catch (err) {
      throw err;
    }
  });

export default handler;
