const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb+srv://R5207644:GdussKJ7jFf9tWtF@cluster0.rmfssb5.mongodb.net/trippixel";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();