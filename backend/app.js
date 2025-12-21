require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectToDB = require("./config/db.config");
const UserRouter = require("./routes/users.routes");
const LeadsRouter = require("./routes/leads.routes");
const app = express();
app.use(cors()); //cors middleware

const PORT = process.env.PORT;
connectToDB();

//body parser middleware
app.use(express.json())

//test route
app.get("/test",(req, res)=>{
    try{
        res.json({message : "Test route is working fine"})
    }catch(err){
        res.json({message : "test route is not working", err})
    }
})

//handling user routes
app.use("/api", UserRouter)

//handling leads routes
app.use("/api", LeadsRouter);

// wrong route handler
app.use((req, res) => {
    res.status(404).json({
        message: "Walking on the wrong route.. check URL or method"
    });
}); 

//starting a server
app.listen(PORT, ()=>{
    try{
        console.log("server is starting on PORT ", PORT)
    }catch(err){
        console.log("err starting a server", err);
    }
})