const mongoose = require("mongoose");

const Product = mongoose.model("product", {
  CompanyName: String,
  Category: Array,
  logoUrl: String,
  Link: String,
  Description: String,
  Upvotes: Number,
  CommentsCount: Number,
  Comments: Array
});

module.exports = Product;