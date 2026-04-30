const { ServerDescription } = require("mongodb");
const mongoose = require("mongoose");

const plotSchema = new mongoose.Schema(
    {
        plotName:{
            type: String,
            required:true,
            trim:true,
        },
        plotNumber:{
            type:String,
            required:true,
            trim:true,
        },
        facing:{
            type:String,
            required:true,
            trim:true,
        },
        area:{
            type:String,
            required:true,
            trim:true,
        },
        pricePerSqYard:{
            type:Number,
            required:true,
        },
        totalPrice:{
            type:Number,
            required:true,
        },
        location:{
            type:String,
            required:true,
            trim:true,
        },
        description:{
            type:String,
            trim:true,
        },
        image:{
            type:String,
            default:""
        },
        status:{
            type:String,
            enum:["available","sold"],
            default:"available",
        },
    },
    {
        timestamps:true
    }
)
    const plot = mongoose.model("plot",plotSchema);
    module.exports = plot;
