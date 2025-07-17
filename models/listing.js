const mongoose = require("mongoose");

const defaultImage = "https://cdn.pixabay.com/photo/2025/07/11/16/38/landscape-9709190_1280.jpg";
const listingSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    type: String,
    default: defaultImage,
    set: (v) => v === "" ? defaultImage : v,
  },
  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;