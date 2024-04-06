const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");


const userSchema = new Schema({
    email:{
        type:String,
        required:true
    }

});

// User.plugin(passportLocalMongoose);  /*username ,salting ,hashing ,hash password add this to it ! */ 

module.exports = mongoose.model("User",userSchema);