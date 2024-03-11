const mongooose = require("mongoose");
const Schema = mongooose.Schema;


const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        type: String,
        set: (v) => v === "" ? "https://images.unsplash.com/photo-1709713215976-a194717696eb?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,
        default:"https://images.unsplash.com/photo-1709713215976-a194717696eb?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    price: Number,
    location: String,
    country: String,
});


const Listing=mongooose.model("Listing",listingSchema);
module.exports= Listing;

