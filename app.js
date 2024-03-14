const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/list.js")
const path = require("path");
const methodOverride = require("method-override");  //used for editing the requests and posting it again

app.listen(3000, (req, res) => {
    console.log("Running on port 3000");
});


main()
    .then(() => console.log("Connection successful! to DB !"))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));  //to use id feature the req.params one 
app.use(methodOverride("_method"));


/*________BASICS SETUP DONE !_____________________________________________________________________________*/

app.get("/", (req, res) => {
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

app.get("/listings", async (req, res) => {    // allows to view all the lists available on the db 
    const alllistings = await Listing.find({});
    res.render("index.ejs", { alllistings });
});


//creating a route for create a new list

app.get("/listings/new", async (req, res) => {
    res.render("new.ejs");
});

//creating the post requesitng after submutting the lisitngs 

app.post("/listings/", async (req, res) => {
/* method 1    let {title ,description ,image , price ,location ,country } = req.body      //taking anything from thr html form contains the information part in the req.body   */
  const newListing = new Listing(req.body.listing);  // extracting the object from the html form of new.ejs then saving to db
  await newListing.save();
  res.redirect("/listings");  //redirecting succcessfully after the information is stored 

});


// show route 

app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;  //write the extended:true for this 
    const listing = await Listing.findById(id);  // finds the individual by id such as /listings/:id 
    res.render("show.ejs", { listing: listing });
});

// edit route    get- /listings/:id/edit  =>  put /listings/:id

app.get("/listings/:id/edit",async (req,res)=>{
    let { id } = req.params;  //write the extended:true for this 
    const listing = await Listing.findById(id);  // finds the individual by id such as /listings/:id 
    res.render("edit.ejs",{listing});
});

//update  route 

app.put("/listings/:id/",async (req,res)=>{
    let { id } = req.params;  //write the extended:true for this 
    await Listing.findByIdAndUpdate(id ,{...req.body.listing});
    res.redirect(`/listings/${id}`);
});
