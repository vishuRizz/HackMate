const express = require("express");
const router = express.Router();
const { Hackathon, Team, User } = require("../models/db");
const { authenticateFirebaseToken, isOrganizerMiddleware } = require("../middlewares/authenticateFirebaseToken");

// ---------------- Team Routes ----------------

// Create a Team
router.post("/add/:id", authenticateFirebaseToken, async (req, res) => {
  try {
    const hackathonId = req.params.id;
    const leaderFirebaseId = req.user.id;
    const { teamName } = req.body;
    const leader = await User.findOne({ firebaseUid: leaderFirebaseId });
    const leaderId = leader._id;
  
    const team = await Team.findOne({teamName: teamName})
    if(team){
      return res.status(400).json({ error: "Team name already taken" });
    }

    const newTeam = await Team.create({
      teamName,
     leader: leaderId, 
      members: [leaderId],
      hackathonId,
    });

    // Add team to Hackathon
    await Hackathon.findByIdAndUpdate(hackathonId, {
      $push: { teams: newTeam._id },
      $inc: { "stats.totalTeams": 1 },
    });

    res.status(201).json({
      team: newTeam ,
      message: "team created successfully"
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Invite a Member to Team - just pass the inviteed user email in the body 
router.post("/invite/:id", authenticateFirebaseToken, async (req, res) => {
  try {
    const teamId = req.params.id;
    const invitedUserEmail = req.body.invitedUserEmail;

    // Find the invited user by Firebase UID
    const invitedUser = await User.findOne({ email: invitedUserEmail });
    if (!invitedUser) {
      return res.status(404).json({ error: "email not found, no such user exist at hackmate, please invite them to login here" });
    }
    const invitedUserId = invitedUser._id;

    // Find the team
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    // Find the hackathon to get maxTeamSize
    const hackathon = await Hackathon.findById(team.hackathonId);
    if (!hackathon) {
      return res.status(404).json({ error: "Associated hackathon not found" });
    }

    // Check if the team already has the max allowed members (including invitations)
    const currentTeamSize = team.members.length + team.invitations.length;
    if (currentTeamSize >= hackathon.maxTeamSize) {
      return res
        .status(400)
        .json({ error: `Team cannot exceed the maximum size of ${hackathon.maxTeamSize} members.` });
    }

    // Add invitation to the team
    const updatedTeam = await Team.findByIdAndUpdate(
      teamId,
      {
        $push: {
          invitations: { invitedUser: invitedUserId, status: "pending" },
        },
      },
      { new: true }
    );

    res.json({
      team: updatedTeam,
      message: "Invitation sent successfully",
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.put("/respond/:id", authenticateFirebaseToken, async (req, res) => {
  try {
    const teamId = req.params.id; // ID of the team
    const userFirebaseId = req.user.id; // Firebase UID of the user
    const { status } = req.body; // Status of the invitation: "accepted" or "declined"

    // Fetch user by Firebase UID
    const user = await User.findOne({ firebaseUid: userFirebaseId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userId = user._id; // MongoDB ObjectId of the user

    // Validate status input
    if (status !== "accepted" && status !== "declined") {
      return res.status(400).json({ error: "Invalid status provided" });
    }

    // Fetch the team
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    // Check if the user has an invitation
    const invitationIndex = team.invitations.findIndex(
      (invite) => invite.invitedUser.toString() === userId.toString()
    );

    if (invitationIndex === -1) {
      return res.status(404).json({ error: "Invitation not found" });
    }

    // Update based on status
    let update;
    if (status === "accepted") {
      // Avoid duplicates in the members array
      if (!team.members.some((member) => member.toString() === userId.toString())) {
        update = {
          $addToSet: { members: userId }, // Add the user to members
          $pull: { invitations: { invitedUser: userId } }, // Remove the invitation
        };
      } else {
        return res.status(400).json({ error: "User is already a member of the team" });
      }
    } else if (status === "declined") {
      update = {
        $pull: { invitations: { invitedUser: userId } }, // Only remove the invitation
      };
    }

    // Perform the update
    const updatedTeam = await Team.findByIdAndUpdate(teamId, update, { new: true });

    if (!updatedTeam) {
      return res.status(404).json({ error: "Team update failed" });
    }

    // Return the updated team
    res.json({
      team: updatedTeam,
      message: `Invitation ${status} successfully.`,
    });
  } catch (err) {
    console.error("Error updating team:", err.message); // Log errors for debugging
    res.status(500).json({ error: "Internal server error" });
  }
});






module.exports = router;