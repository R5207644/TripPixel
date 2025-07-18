const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");

const DB_URL = "mongodb://127.0.0.1:27017/trippixel";
const PORT = 8080;

//database connection
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
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//Create route
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

// Inserting new listing route
app.post("/listings", async (req, res) => {
  await new Listing(req.body.listing).save();
  res.redirect("/listings");
});

//read route
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

//show route
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);

  res.render("listings/show.ejs", { listing });
});

// edit route
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  res.render("listings/edit.ejs", { listing: await Listing.findById(id) });
});

//update route
app.put("/listings/:id", async (req, res) => {
  let {id}  = req.params;;
  await Listing.findByIdAndUpdate(id, req.body.listing);
  res.redirect(`/listings/${id}/edit`);
});

//delete route
app.delete("/listings/:id", async(req, res) => {
  let {id } = req.params;
  let deleted = await Listing.findByIdAndDelete(id);
  console.log(deleted);
  res.redirect("/listings");
});


app.listen(PORT, () => {
  console.log("app is listening on port" + PORT);
});