import { model, models, Schema, Types } from "mongoose";

import { item, shoppingListStatus } from "../interface";

interface ShoppingList {
  name: String;
  owner: Types.ObjectId;
  items: {
    item: Types.ObjectId;
    quantity: number;
    bought: boolean;
  }[];
  status: shoppingListStatus;
}

const ShoppingListSchema = new Schema<ShoppingList>(
  {
    name: {
      type: String,
      required: [true, "please provide a name for this item"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "userId must be provided"],
      select: false,
    },
    items: [
      {
        item: { type: Schema.Types.ObjectId, ref: "Item" },
        quantity: { type: Number, default: 1 },
        bought: { type: Boolean, default: false },
      },
    ],
    status: {
      type: String,
      enum: shoppingListStatus,
      default: shoppingListStatus.active,
    },
  },
  { timestamps: true }
);


const ShoppingList =
  models.ShoppingList ||
  model<ShoppingList>("ShoppingList", ShoppingListSchema);

export default ShoppingList;
