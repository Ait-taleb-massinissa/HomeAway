const mongoose = require('mongoose');

const placesSchema = new mongoose.Schema({
    owner:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    title:String,
    address:String,
    photos:[String],
    maxguests:Number,
    description:String,
    perks:[]
})

const placesModel = mongoose.model("places",placesSchema);
module.exports=placesModel;