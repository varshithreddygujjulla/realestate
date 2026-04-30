const jwt = require("jsonwebtoken");
const express = require("express");
const Owner = require("../models/Owner");
const { route } = require("./plotRoutes");

const router = express.Router();

router.post ("/signup", async(req,res)=>{
    try{
        const {name,phone,password} = req.body;

        const existingOwner = await Owner.findOne({phone});

        if(existingOwner){
            return res.status(400).json({
                message: "owner already exists",
            });
        }

        const newOwner = new Owner({
        name,
        phone,
        password,
    });

        const savedOwner = await newOwner.save();

        res.status(201).json({
            message:"owner created sucessfully",
            owner :savedOwner,
        });
    }catch(error){
        res.status(500).json({
            message:"error creating owner",
            error: error.message,
    });
    }
})

router.post("/login", async(req,res) =>{
    try{
        const {phone, password} = req.body;
        const owner = await Owner.findOne({phone});
        if(!owner){
            return res.status(404).json({
                message:"owner not found"
            });
    }
    if(owner.password !== password){
        return res.status(400).json({
            message:"invalid credentials",
        });
    }

    const token = jwt.sign(
  { id: owner._id, phone: owner.phone },
  "myjwtsecret123",
  { expiresIn: "1d" }
);
    res.status(200).json({
      message: "login successful",
      token: token,
      owner: owner,
    });
    }catch(error){
        res.status(500).json({
            message: "error logging in ",
            error: error.message,
        });
    }
})
module.exports = router;