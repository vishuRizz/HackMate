const { Hackathon } = require("../models/db")

const isOrganizerMiddleware = async (req, res, next) => {
  try {
    const userId = req.user.id; // From authenticateFirebaseToken
    const hackathonId = req.params.id;

    const hackathon = await Hackathon.findById(hackathonId);
    if (!hackathon) {
      return res.status(404).json({ error: "Hackathon not found" });
    }

    if (hackathon.organizer.toString() !== userId) {
      return res.status(403).json({ error: "You are not the organiser of this hackathon fuck off." });
    }

    next(); // User is authorized
  } catch (err) {
    console.error("Error in isOrganizerMiddleware:", err.message);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

module.exports = { isOrganizerMiddleware };
