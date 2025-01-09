require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const mongoose = require("mongoose");
const { processRFP } = require("./aimodule");
const RFP = require("./models/rfpModel");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Multer setup for file uploads
const upload = multer({ dest: "uploads/" });

// Routes
app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      console.error("No file received");
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { originalname, path } = req.file;
    console.log("File received:", {
      originalname,
      path,
      mimetype: req.file.mimetype,
      size: req.file.size
    });

    const proposal = await processRFP(path);
    console.log("Proposal generated successfully");
    
    res.status(200).json({ message: "Proposal generated", proposal });
  } catch (error) {
    console.error("Server error details:", error);
    res.status(500).json({ 
      error: "Error processing RFP",
      details: error.message 
    });
  }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
