const express = require("express");
const LeadsRouter = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const LeadModel = require("../models/leads.models");


//make it protected : only valid user can see

//fetch all leads
LeadsRouter.get("/leads", authMiddleware(["manager","admin"]), async (req, res)=>{
    try{
        let leads = await LeadModel.find();
        res.status(200).json({message : "Fetched all leads", leads});
    }catch(err){
        res.status(500).json({message : "failed fetching leads",Error : err.message});
    }
})

//fetch lead by id
LeadsRouter.get("/leads/:leadId", authMiddleware(["admin","manager"]), async (req, res)=>{
    try{
        const {leadId} = req.params;
        let lead = await LeadModel.find({_id:leadId});
        res.json({message : "fetched Required lead", lead})
    }catch(err){
        res.json({message : "error fetching lead",err})
    }
})

//adding leads
LeadsRouter.post("/addlead", authMiddleware(["manager","admin"]), async (req, res)=>{
    try{
        //attach the userId from auth middleware
        let lead = await LeadModel.create({...req.body,createdBy:req.user.id})
        res.status(200).json({message : "lead added", lead})
    }catch(err){
        console.log(err.message)
        res.status(500).json({message : err.message})
    }
})


//delete lead
LeadsRouter.delete("/leads/:leadId",authMiddleware(["manager","admin"]), async (req, res)=>{
    try{
        const {leadId} = req.params;
        await LeadModelModel.findByIdAndDelete(leadId);
        res.json({message : "successfully deleted lead"})
    }catch(err){
        res.json("error deleting lead");
    }
})

//update lead
LeadsRouter.patch("/leads/:leadId",authMiddleware(["manager","admin"]), async (req, res)=>{
    try{
        const {leadId} = req.params;
        const updatedData = req.body;
        await LeadModel.findByIdAndUpdate(leadId, updatedData);
        const lead = await LeadModel.findById(leadId);
        res.json({message : "lead data updated", lead});
    }catch(err){ 
        res.json({message : "error updating lead data", err})
    }
})

module.exports = LeadsRouter;