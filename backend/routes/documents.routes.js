// routes/documents.routes.js
const express = require("express");
const DocumentsRouter = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const DocumentModel = require("../models/documents.model");

// create document (upload metadata)
DocumentsRouter.post(
  "/documents",
  authMiddleware(["sales_rep", "manager", "admin"]),
  async (req, res) => {
    try {
      const doc = await DocumentModel.create({
        ...req.body,
        uploadedBy: req.user
      });
      res.status(201).json({ message: "Document added", doc });
    } catch (err) {
      res.status(500).json({ message: "Error adding document", err });
    }
  }
);

// get documents by lead
DocumentsRouter.get(
  "/documents/lead/:leadId",
  authMiddleware(["sales_rep", "manager", "admin"]),
  async (req, res) => {
    try {
      const docs = await DocumentModel.find({ leadId: req.params.leadId })
        .populate("uploadedBy", "name email role");
      res.json({ total: docs.length, docs });
    } catch (err) {
      res.status(500).json({ message: "Error fetching documents", err });
    }
  }
);

// get documents uploaded by a user
DocumentsRouter.get(
  "/documents/user/:userId",
  authMiddleware(["manager", "admin"]),
  async (req, res) => {
    try {
      const docs = await DocumentModel.find({ uploadedBy: req.params.userId })
        .populate("leadId", "name company");
      res.json({ total: docs.length, docs });
    } catch (err) {
      res.status(500).json({ message: "Error fetching documents", err });
    }
  }
);

// update document (metadata/version)
DocumentsRouter.patch(
  "/documents/:docId",
  authMiddleware(["manager", "admin"]),
  async (req, res) => {
    try {
      const doc = await DocumentModel.findByIdAndUpdate(
        req.params.docId,
        req.body,
        { new: true }
      );
      res.json({ message: "Document updated", doc });
    } catch (err) {
      res.status(500).json({ message: "Error updating document", err });
    }
  }
);

// delete document
DocumentsRouter.delete(
  "/documents/:docId",
  authMiddleware(["admin"]),
  async (req, res) => {
    try {
      await DocumentModel.findByIdAndDelete(req.params.docId);
      res.json({ message: "Document deleted" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting document", err });
    }
  }
);

module.exports = DocumentsRouter;
