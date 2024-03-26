const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new mongoose.Schema({
    comment: {
        type: String,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});



// this is one tp many relations as many reviews are connected to single listing 
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
