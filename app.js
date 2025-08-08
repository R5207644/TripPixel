const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const DB_URL = "mongodb+srv://R5207644:GdussKJ7jFf9tWtF@cluster0.rmfssb5.mongodb.net/trippixel";
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
app.use(express.static(path.join(__dirname, "/public")));
app.engine('ejs', ejsMate);

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
  let listings = await Listing.find({});
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
  res.redirect(`/listings/${id}`);
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