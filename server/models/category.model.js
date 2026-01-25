import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      // ❌ REMOVE this line:
      // unique: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    parentCatName: {
      type: String,
      default: "",
      trim: true,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
  },
  { timestamps: true }
);

// ✅ Create compound index (name + parentId)
categorySchema.index({ name: 1, parentId: 1 }, { unique: true });

const CategoryModel = mongoose.model("Category", categorySchema);

export default CategoryModel;
