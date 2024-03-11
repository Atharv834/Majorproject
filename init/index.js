const mongoose = require("mongoose");
const initiData = require("./data.js");
const Listing= require("../models/list.js")

main()
    .then(() => console.log("Connection successful! to DB !"))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}


/* basics done */

const initDB = async ()=>{
    await Listing.deleteMany({});  // used to dlete all the items inserted before the inserted data as we insert many items for testing
    await Listing.insertMany(initiData.data);
    console.log("Data was initialiased !");
};

initDB();