const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10; //password strength - keep it 10 don't increase
const UserModel = require("../models/user.model");
const authMiddleware = require("../middlewares/auth.middleware");
const LeadModel = require("../models/leads.models");
const UserRouter = express.Router();


//get all users
UserRouter.get("/users", async (req, res) => {
    try {
        const users = await UserModel.find();
        res.json({ message: "fetched all users", users })
    } catch (err) {
        res.json({ message: "error fetching users data", err })
    }
})

//signup user
UserRouter.post("/signup", async (req, res) => {
    try {
        const { name, email, password, role, isActive } = req.body;
        bcrypt.hash(password, saltRounds, async function (err, hash) {
            if (err) {
                res.status(500).json({ message: "hashing not working", err })
            } else {
                console.log("rawpassword :", password, "hashedpassword : ", hash);
                await UserModel.create({ name, email, password: hash, role, isActive })
                res.status(201).json({ message: "signup success" })
            }
        })
    } catch (err) {
        res.json({ message: "signup failed", err })
    }
})


//login user
UserRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await UserModel.findOne({ email }); //check if user exist or not?
        if (!user) {
            res.status(404).json({ message: "user not found please signup" })
        } else {
            let hash = user.password; //hashed stored password
            bcrypt.compare(password, hash, function (err, result) {
                if (result) {
                    const accessToken = jwt.sign({ userID: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: 1800 });
                    const refreshToken = jwt.sign({ userID: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: 1800 });
                    res.status(200).json({ msg: "login success", accessToken, refreshToken })
                } else {
                    res.status(200).json({ message: "Wrong password" })
                }
            })
        }
    } catch (err) {
        res.status(500).json({ message: "Error login", err })
    }
})


//delete user
UserRouter.delete("/users/:userId", authMiddleware(["admin"]), async (req, res) => {
    try {
        const { userId } = req.params;
        await UserModel.findByIdAndDelete(userId);
        res.json({ message: "successfully deleted user" })
    } catch (err) {
        res.json("error deleting user");
    }
})

//update user
UserRouter.patch("/users/:userId", authMiddleware(["manager", "admin"]), async (req, res) => {
    try {
        const { userId } = req.params;
        const updatedData = req.body;
        await UserModel.findByIdAndUpdate(userId, updatedData);
        const user = await UserModel.findById(userId);
        res.json({ message: "user data updated", user });
    } catch (err) {
        res.json({ message: "error updating user data" })
    }
})

//lead count
UserRouter.get("/users/:userId/lead-count",authMiddleware(["manager", "admin"]),async (req, res) => {
        try {
            const { userId } = req.params;
            // const count = await LeadModel.countDocuments({assignedTo: userId});
            const leads = await LeadModel.find({assignedTo: userId}).populate("assignedTo");

            res.json({userId,LeadsData: leads});
        } catch (err) {
            res.status(500).json({ message: "Error fetching lead count",err});
        }
    }
);



module.exports = UserRouter;