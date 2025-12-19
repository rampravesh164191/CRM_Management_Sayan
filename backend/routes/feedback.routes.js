const express = require("express");
const FeedbackRouter = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const FeedbackModel = require("../models/feedback.model");

// add feedback
FeedbackRouter.post(
  "/feedbacks/:leadId",
  authMiddleware(["sales_rep", "manager", "admin"]),
  async (req, res) => {
    try {
      const feedback = await FeedbackModel.create({
        ...req.body,
        leadId: req.params.leadId,
        userId: req.user
      });
      res.status(201).json({ message: "Feedback added", feedback });
    } catch (err) {
      res.status(500).json({ message: "Error adding feedback" });
    }
  }
);

// get feedbacks of a lead
FeedbackRouter.get(
  "/feedbacks/:leadId",
  authMiddleware(["manager", "admin"]),
  async (req, res) => {
    try {
      const feedbacks = await FeedbackModel
        .find({ leadId: req.params.leadId })
        .populate("userId", "name email");

      res.json({ count: feedbacks.length, feedbacks });
    } catch (err) {
      res.status(500).json({ message: "Error fetching feedbacks" });
    }
  }
);

module.exports = FeedbackRouter;
