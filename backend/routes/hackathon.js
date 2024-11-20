const express = require("express");
const { authenticateToken } = require("../middlewares/middleware");
const { authenticateAdmin } = require("../middlewares/authenticateAdmin");
const { Hackathon } = require("../models/db");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const hackathons = await Hackathon.find().sort({ date: 1 });
    res.status(200).json({ hackathons });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching hackathons.", error: err.message });
  }
});

router.post("/", authenticateToken, authenticateAdmin, async (req, res) => {
  const { id, title, description, date, duration, location, organizer, link } =
    req.body;

  try {
    let hackathon;
    if (id) {
      hackathon = await Hackathon.findByIdAndUpdate(
        id,
        { title, description, date, duration, location, organizer, link },
        { new: true }
      );
    } else {
      hackathon = new Hackathon({
        title,
        description,
        date,
        duration,
        location,
        organizer,
        link,
      });
      await hackathon.save();
    }
    res
      .status(200)
      .json({ message: "Hackathon updated successfully.", hackathon });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating hackathon.", error: err.message });
  }
});


module.exports = router;