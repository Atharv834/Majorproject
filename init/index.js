const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing= require("../models/list.js")

main()
    .then(() => console.log("Connection successful! to DB !"))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}


/* basics done */

async function initDB() {
    try {
      await Listing.deleteMany({});
      await Listing.insertMany(initData.data);
      console.log("Data was initialiased!");
    } catch (err) {
      console.error("Error initializing data:", err);
    }
  }
  
  initDB();