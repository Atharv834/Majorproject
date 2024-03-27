const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/list.js")
const path = require("path");
const methodOverride = require("method-override");  //used for editing the requests and posting it again
const ejsMate = require("ejs-mate");   // reqruing from the webiste 
const ExpressError = require("./ExpressError");

const Review = require("./models/reviews.js")




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
app.engine('ejs', ejsMate);   //install npm i ejs-mate and then require 
app.use(express.static(path.join(__dirname,"/public")));  //to use the static file scuh as css 



/*________BASICS SETUP DONE !_____________________________________________________________________________*/




app.get("/", (req, res) => {
    res.send("Welcome to Wanderlust !");
});


/* adding some new data  */

// app.get("/textListing",(req,res)=>{
//     let sampleListing = new Listing({
//         title:"MY new villa !",
//         description:"on the Face of the beach !",
//        price:5000,
//        location:"Mumbai ",
//        country:"India ",
//     });submit-review"

// mongoose.connect('mongodb://127.0.0.1:27017/test')
//   .then(() => console.log('Connected!'));mple saved");
// //     })
// //     .catch((err) => {
// //         console.error("Error saving sample:", err);
// //     });

// // });

app.get("/listings", async (req, res,next) => { // allows to view all the lists available on the db 

    try{
        const alllistings = await Listing.find({});
        res.render("index.ejs", { alllistings });
    }
    catch(err){
      next(err);
    }
   
});


//creating a route for create a new list

app.get("/listings/new", async (req, res) => {
    res.render("new.ejs");
});

//creating the post requesitng after submutting the lisitngs 

app.post("/listings/", async (req, res,next) => {
/* method 1    let {title ,description ,image , price ,location ,country } = req.body      //taking anything from thr html form contains the information part in the req.body   */
   
    const newListing = new Listing(req.body.listing);  // extracting the object from the html form of new.ejs then saving to db
    await newListing.save();
    res.redirect("/listings");  //redirecting succcessfully after the information is stored 
  
  
});


// show route 

app.get("/listings/:id", async (req, res,next) => {

    try{
        let { id } = req.params;  //write the extended:true for this 
        const listing = await Listing.findById(id);  // finds the individual by id such as /listings/:id 

        if (!listing){
            next(new ExpressError(500,"Hotels doesnt exists !"));
        }
        res.render("show.ejs", { listing: listing });
    }

    catch(err){
        next(err);
    }
        
});

// edit route    get- /listingssubmit-review"/:id/edit  =>  put /listings/:id

app.get("/listings/:id/edit",async (req,res,next)=>{

    try{/*  Express error inherits the properties from the default 
    error class used in express    */
        let { id } = req.params;  //write the extended:true for this 
        const listing = await Listing.findById(id);  // finds the individual by id such as /listings/:id 
        res.render("edit.ejs",{listing});
    }
    catch(err){
        next(err);
    }
   
});

//update  route 

app.put("/listings/:id/",async (req,res,next)=>{
    try {
        let { id } = req.params;  //write the extended:true for this 
        await Listing.findByIdAndUpdate(id ,{...req.body.listing});
        res.redirect(`/listings/${id}`);
    }
    catch (err){
        next(err);
    }
    
});


//deleting any route 

app.delete("/listings/:id/",async(req,res,next)=>{

    try{
        let { id } = req.params;           //taking the id paramter from the req.params 
        let deletedListing =  await Listing.findByIdAndDelete(id);   //deleting the particular listing of given id 
        console.log(deletedListing);
        res.redirect("/listings");
    }
    catch(err){
        next(err);
    }
   
});


/* Review route */ 

app.post("/listings/:id/reviews", async (req,res,next) => {

    try{
        let listing = await Listing.findById(req.params.id);
        let newReview = new Review(req.body.review);
     
        listing.reviews.push(newReview);
     
        await newReview.save();
        await listing.save();
     
        res.send("Review Saved !");
        res.redirect("/listings/:id");
    }
    catch(err){
        next(err);
    }
    
 });
 

app.use((err,req,res,next)=>{
    let {status = 500,message = "Access denied "} = err;
    res.render("error.ejs" ,{message});
    // res.status(status).send(message);
  //using middlewares for handling the error 
});


app.listen(3000, (req, res) => {
    console.log("Running on port 3000");
});