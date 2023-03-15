import { model, models, Schema, Types } from "mongoose";

interface Item {
  name: String;
  note?: String;
  image?: String;
  category: Types.ObjectId;
  owner: Types.ObjectId;
}

const itemSchema = new Schema<Item>({
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

const Item = models.Item || model<Item>("Item", itemSchema);

export default Item;
