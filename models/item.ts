import { model, models, Schema, Types } from "mongoose";
import ShoppingList from "./_shoppingList";

interface Item {
  name: String;
  note?: String;
  image?: String;
  category: Types.ObjectId;
  owner: Types.ObjectId;
}

export const itemSchema = new Schema<Item>({
  name: {
    type: String,
    required: [true, "please provide a name for this item"],
  },
  note: { type: String, default: "" },
  image: { type: String, default: "" },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "please provide a category for this item"],
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "userId must be provided"],
    select: false,
  },
});

itemSchema.pre("deleteOne", { document: true }, function (next) {
  const item = this;
  // @ts-ignore
  ShoppingList.updateMany(
    // @ts-ignore
    { "items.item": item._id },
    // @ts-ignore
    { $pull: { items: { item: item._id } } },
    next
  );
});

const Item = models.Item || model<Item>("Item", itemSchema);

export default Item;
