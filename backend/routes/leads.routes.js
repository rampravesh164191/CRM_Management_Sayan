const express = require("express");
const LeadsRouter = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const LeadModel = require("../models/leads.models");


//make it protected : only valid user can see

//fetch all leads
LeadsRouter.get("/leads", authMiddleware(["manager","admin"]), async (req, res)=>{
    try{
        let leads = await LeadModel.find({createdBy : req.user});
        res.status(200).json({message : "leads list", leads});
    }catch(err){
        res.status(500).json({message : "failed adding list",err});
    }
})

//adding leads
LeadsRouter.post("/add-lead", authMiddleware(["manager","admin"]), async (req, res)=>{
    try{
        //attach the userId from auth middleware
        let lead = await LeadModel.create({...req.body,createdBy:req.user})
        res.status(200).json({message : "lead added", lead})
    }catch(err){
        res.status(500).json({message : "failed adding lead", err})
    }
})

module.exports = LeadsRouter;