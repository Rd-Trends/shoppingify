import { model, models, Schema, Types } from "mongoose";

interface Category {
  name: string;
  owner: Types.ObjectId;
}

const categorySchema = new Schema<Category>({
  name: {
    type: String,
    required: [true, "please provide a name for this category"],
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "userId must be provided"],
    select: false,
  },
});

const Category = models.Category || model<Category>("Category", categorySchema);

export default Category;
