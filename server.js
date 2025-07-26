const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5001;

// ✅ Allow frontend deployed on Netlify
app.use(cors({
  origin: "https://photo-gallery-frontend.netlify.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Routes
const photoRoutes = require("./routes/photoRoutes");
app.use("/api/photos", photoRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
