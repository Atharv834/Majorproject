const express= require("express");
const app = express();
const mongoose =require("mongoose");
const Listing= require("./models/list.js")
const path=require("path");

app.listen(3000,(req,res)=>{
    console.log("Running on port 3000");
});


main()
    .then(() => console.log("Connection successful! to DB !"))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));  //to use id feature the req.params one 


/*________BASICS SETUP DONE !_____________________________________________________________________________*/

app.get("/",(req,res)=>{
    res.send("hello root!");
});


/* adding some new data  */

// app.get("/textListing",(req,res)=>{
//     let sampleListing = new Listing({
//         title:"MY new villa !",
//         description:"on the Face of the beach !",
//        price:5000,
//        location:"Mumbai ",
//        country:"India ",
//     });

//     sampleListing.save()
//     .then(() => {
//         console.log("Sample saved");
//     })
//     .catch((err) => {
//         console.error("Error saving sample:", err);
//     });

// });

app.get("/listings",async (req,res)=>{    // allows to view all the lists available on the db 
    const alllistings = await Listing.find({});
    res.render("index.ejs",{alllistings});
});


// show route 

app.get("/listings/:id",async (req,res)=>{
    let {id}= req.params;  //write the extended:true for this 
    const listing = await Listing.findById(id);  // finds the individual by id such as /listings/:id 
    res.render("show.ejs",{listing:listing});
});
