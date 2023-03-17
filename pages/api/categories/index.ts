import { NextApiResponse } from "next";
import nextConnect from "next-connect";

import { category, NextApiReq, shoppingListStatus } from "../../../interface";
import auth from "../../../middleware/auth";
import init from "../../../middleware/init";
import Category from "../../../models/category";

const handler = nextConnect();

handler
  .use(init)
  .use(auth)
  .get(async (req: NextApiReq, res: NextApiResponse, next) => {
    try {
      const userCategories = await Category.find({
        owner: req.user._id,
      });
      return res.status(200).json(userCategories);
    } catch (err) {
      res.status(500).send("an error occured");
    }
  })
  .post(async (req: NextApiReq, res: NextApiResponse, next) => {
    try {
      const { name } = req.body;

      if (!name) return res.status(400).send("Missing Field");

      const newCategory = new Category({
        name,
        owner: req.user._id,
      });

      newCategory.save().then((category: category) => {
        return res.status(201).json(category);
      });
    } catch (err) {
      res.status(500).send("an error occured");
    }
  });

export default handler;
