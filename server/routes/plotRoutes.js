const isOwnerLoggedIn = require("../middlewares/authMiddleware");
const express = require("express");
const Plot =  require("../models/plot");

const router = express.Router();

router.post("/",isOwnerLoggedIn,async(req,res)=>{
    try{
        const newPlot = new Plot(req.body);// takes the data of the new plot from the req.body
        const savedPlot = await newPlot.save();// saved in the mongodb and also the savedplot

        res.status(201).json({
            message:"plot created sucessfully",
            plot:savedPlot,//displays the plot data we have stroed
        });
    }catch (error){
        res.status(500).json({
            message:"error creating plot",
            error:error.message,
        });
    }
});

router.get("/",async(req,res)=>{
    try{
        const plots = await Plot.find();

        res.status(200).json({
            message:"plots fetched suceesfully",
            plots:plots,// displays all the plots found
        });
    }catch(error){
        res.status(500).json({
            message:"error fetching plots",
            error:error.message,
        })
    }
})

router.get("/:id", async(req,res)=>{
    try{
        const plot = await Plot.findById(req.params.id);

        if(!plot){// if the code runs correctly but the data of the plot is not their
            return res.status(404).json({
                message:"plot not found",
            });
        }
        res.status(200).json({
            message:"plot fetched sussefully",
            plot:plot,
        });
    }catch(error){// this handles when something went wrong while rnnig the code
        res.status(500).json({
            message:"error fetching plot",
            error:error.message,
        });
    }
})

router.put("/:id",isOwnerLoggedIn,async(req,res) =>{
    try{
        const updatedPlot = await Plot.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true,runValidators:true}
        );
        if(!updatedPlot){
            return res.status(404).json({
                message:"plot not found",
            });
        }
        res.status(200).json({
            message:"plot updated sucessfully",
            plot:updatedPlot,
        });
    }catch(error){
        res.status(508).json({
            message:"error updating plot",
            error:error.message,
        })
    }
})
router.delete("/:id",isOwnerLoggedIn, async (req, res) => {
  try {
    const deletedPlot = await Plot.findByIdAndDelete(req.params.id);

    if (!deletedPlot) {
      return res.status(404).json({
        message: "plot not found",
      });
    }

    res.status(200).json({
      message: "plot deleted successfully",
      plot: deletedPlot,
    });
  } catch (error) {
    res.status(500).json({
      message: "error deleting plot",
      error: error.message,
    });
  }
});
module.exports=router;