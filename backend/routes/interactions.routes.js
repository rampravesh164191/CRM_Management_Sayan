const express = require("express");
const InteractionRouter = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const InteractionModel = require("../models/interaction.model");


//Add interaction to a lead
InteractionRouter.post(
  "/leads/:leadId/interactions",
  authMiddleware(["sales_rep", "manager", "admin"]),
  async (req, res) => {
    try {
      const { leadId } = req.params;

      const interaction = await InteractionModel.create({
        ...req.body,
        leadId,
        userId: req.user
      });

      res.status(201).json({ message: "Interaction added", interaction });
    } catch (err) {
      res.status(500).json({ message: "Failed to add interaction" });
    }
  }
);


//Get all interactions of a lead
InteractionRouter.get(
  "/leads/:leadId/interactions",
  authMiddleware(["sales_rep", "manager", "admin"]),
  async (req, res) => {
    try {
      const { leadId } = req.params;

      const interactions = await InteractionModel.find({ leadId })
        .populate("userId", "name email role");

      res.json({ interactions });
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch interactions" });
    }
  }
);


//all interactions done by logged-in user
InteractionRouter.get(
  "/interactions/my",
  authMiddleware(["sales_rep", "manager", "admin"]),
  async (req, res) => {
    try {
      const interactions = await InteractionModel.find({ userId: req.user })
        .populate("leadId", "name company stage");

      res.json({ interactions });
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch user interactions" });
    }
  }
);


// deleting 
InteractionRouter.delete(
  "/interactions/:interactionId",
  authMiddleware(["manager", "admin"]),
  async (req, res) => {
    try {
      await InteractionModel.findByIdAndDelete(req.params.interactionId);
      res.json({ message: "Interaction deleted" });
    } catch (err) {
      res.status(500).json({ message: "Failed to delete interaction" });
    }
  }
);

module.exports = InteractionRouter;
