const express = require("express");
const router = express.Router();
const { Hackathon, User } = require("../models/db");
const { authenticateFirebaseToken } = require("../middlewares/authenticateFirebaseToken");
const { isOrganizerMiddleware } = require("../middlewares/isOrganiserMiddleware")

// ---------------- Hackathon Routes ----------------

// Create a new Hackathon
router.post("/", authenticateFirebaseToken, async (req, res) => {
  try {
    const firebaseUid = req.user.id; 

    const organizer = await User.findOne({ firebaseUid });
    if (!organizer) {
      return res.status(404).json({ error: "Organizer not found. Please register first." });
    }

    const hackathon = await Hackathon.create({
      ...req.body,
      organizer: organizer._id,
    });

    await User.findByIdAndUpdate(organizer._id, {
      $push: { hostedHackathons: hackathon._id },
    });

    res.status(201).json(hackathon);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Get all Hackathons
router.get("/", async (req, res) => {
  try {
    const { isPublic } = req.query;
    const filter = isPublic ? { isPublic: isPublic === "true" } : {};
    const hackathons = await Hackathon.find(filter);
    res.json(hackathons);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get Hackathon by ID
router.get("/:id", async (req, res) => {
  try {
    const hackathon = await Hackathon.findById(req.params.id).populate("teams");
    if (!hackathon) return res.status(404).json({ error: "Hackathon not found" });
    res.json(hackathon);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update Hackathon Details
router.put("/:id", authenticateFirebaseToken, isOrganizerMiddleware, async (req, res) => {
  try {
    const hackathon = await Hackathon.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!hackathon) return res.status(404).json({ error: "Hackathon not found" });
    res.json(hackathon);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a Hackathon
router.delete("/:id", authenticateFirebaseToken, isOrganizerMiddleware, async (req, res) => {
  try {
    const hackathon = await Hackathon.findByIdAndDelete(req.params.id);
    if (!hackathon) return res.status(404).json({ error: "Hackathon not found" });
    res.json({ message: "Hackathon deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get Hackathon Stats
router.get("/:id/stats", isOrganizerMiddleware, async (req, res) => {
  try {
    const hackathon = await Hackathon.findById(req.params.id);
    if (!hackathon) return res.status(404).json({ error: "Hackathon not found" });
    const stats = hackathon.stats;
    res.json(stats);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


module.exports = router;
