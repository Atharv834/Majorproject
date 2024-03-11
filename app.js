const express= require("express");
const app = express();
const mongoose =require("mongoose");
const Listing= require("./models/list.js")

app.listen(3000,(req,res)=>{
    console.log("Running on port 3000");
});


main()
    .then(() => console.log("Connection successful! to DB !"))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}
/*________BASICS SETUP DONE !_____________________________________________________________________________*/

app.get("/",(req,res)=>{
    res.send("hello root!");
});

app.get("/textListing",(req,res)=>{
    let sampleListing = new Listing({
        title:"MY new villa !",
        description:"on the Face of the beach !",
       price:5000,
       location:"Mumbai ",
       country:"India ",
    });

    sampleListing.save()
    .then(() => {
        console.log("Sample saved");
    })
    .catch((err) => {
        console.error("Error saving sample:", err);
    });

});

