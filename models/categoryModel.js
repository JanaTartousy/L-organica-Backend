import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const { Schema, model } = mongoose;
const categorySchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
  },
  {
    collection: "Category",
  }
);

categorySchema.plugin(mongoosePaginate);

const Category = model("Category", categorySchema);
export default Category;
