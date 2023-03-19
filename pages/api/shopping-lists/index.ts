import { NextApiResponse } from "next";
import nextConnect from "next-connect";

import { NextApiReq, shoppingListStatus } from "../../../interface";
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
      const userShoppingLists = await ShoppingList.find({
        owner: req.user._id,
      }).populate("items.item", "", Item);

      return res.status(200).json(userShoppingLists);
    } catch (err) {
      console.log(err);
      res.status(500).send("an error occured");
    }
  })
  .post(async (req: NextApiReq, res: NextApiResponse, next) => {
    try {
      const { name, items, status = shoppingListStatus.active } = req.body;

      if (!name || !items) return res.status(400).send("Missing Field(s)");

      const newShoppingList = new ShoppingList({
        name,
        items,
        status,
        owner: req.user._id,
      });

      await newShoppingList.save();
      await newShoppingList.populate("items.item");
      await newShoppingList.populate("items.item.category");
      return res.status(201).json(newShoppingList);
    } catch (err) {
      res.status(500).send("an error occured");
    }
  });

export default handler;
