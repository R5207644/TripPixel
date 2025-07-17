const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");

const DB_URL = "mongodb://127.0.0.1:27017/trippixel";
const PORT = 8080;

async function main() {
  await mongoose.connect(DB_URL);
}

main()
  .then((res) => {
    console.log("db connected.....");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("hii i am root");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));

app.get("/listings", async (req, res) => {
  let listings = [];
  let allListings = await Listing.find({});
  for (let { _id, title } of allListings) {
    let listing = {};
    listing._id = _id;
    listing.title = title;
    listings.push(listing);
  }
  res.render("listings/index.ejs", { listings });
});

app.get("/listings/:id", async(req, res) => {
  let {id} = req.params;
  const listing = await Listing.findById(id);

  res.render("listings/show.ejs", {listing});
});

app.listen(PORT, () => {
  console.log("app is listening on port" + PORT);
});