const express = require("express");
const FollowupRouter = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const FollowupModel = require("../models/followup.model");

/**
 * Create followup
 */
FollowupRouter.post(
  "/followups",
  authMiddleware(["sales_rep", "manager", "admin"]),
  async (req, res) => {
    try {
      const followup = await FollowupModel.create({
        ...req.body,
        userId: req.user
      });

      res.status(201).json({ message: "Followup created", followup });
    } catch (err) {
      res.status(500).json({ message: "Error creating followup" });
    }
  }
);

/**
 * Get all followups for a lead
 */
FollowupRouter.get(
  "/followups/lead/:leadId",
  authMiddleware(["sales_rep", "manager", "admin"]),
  async (req, res) => {
    try {
      const followups = await FollowupModel.find({
        leadId: req.params.leadId
      })
        .populate("userId", "name email role")
        .populate("leadId", "name email stage");

      res.json({ count: followups.length, followups });
    } catch (err) {
      res.status(500).json({ message: "Error fetching followups" });
    }
  }
);

/**
 * Get my followups (today / pending)
 */
FollowupRouter.get(
  "/followups/my",
  authMiddleware(["sales_rep", "manager", "admin"]),
  async (req, res) => {
    try {
      const followups = await FollowupModel.find({
        userId: req.user
      })
        .populate("leadId", "name email stage")
        .sort({ reminderDate: 1 });

      res.json({ count: followups.length, followups });
    } catch (err) {
      res.status(500).json({ message: "Error fetching followups" });
    }
  }
);

/**
 * Update followup status / notes
 */
FollowupRouter.patch(
  "/followups/:followupId",
  authMiddleware(["sales_rep", "manager", "admin"]),
  async (req, res) => {
    try {
      const followup = await FollowupModel.findByIdAndUpdate(
        req.params.followupId,
        req.body,
        { new: true }
      );

      res.json({ message: "Followup updated", followup });
    } catch (err) {
      res.status(500).json({ message: "Error updating followup" });
    }
  }
);

/**
 * Delete followup (manager/admin)
 */
FollowupRouter.delete(
  "/followups/:followupId",
  authMiddleware(["manager", "admin"]),
  async (req, res) => {
    try {
      await FollowupModel.findByIdAndDelete(req.params.followupId);
      res.json({ message: "Followup deleted" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting followup" });
    }
  }
);

module.exports = FollowupRouter;
