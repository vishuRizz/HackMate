const express = require('express');
const ChatMessage = require('../models/db');
const Conversation = require('../models/db');
const router = express.Router();
const mongoose = require('mongoose');


router.get('/messages/:userId/:contactId', async (req, res) => {
    const { userId, contactId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(contactId)) {
        return res.status(400).json({ error: 'Invalid user ID or contact ID.' });
    }

    try {
        const messages = await ChatMessage.find({
            $or: [
                { senderId: userId, receiverId: contactId },
                { senderId: contactId, receiverId: userId },
            ],
        }).sort({ timestamp: 1 });

        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve messages' });
    }
});

router.get('/messages/:userId/:contactId', async (req, res) => {
    const { userId, contactId } = req.params;
    const { page = 1, limit = 20 } = req.query; 

    try {
        const messages = await ChatMessage.find({
            $or: [
                { senderId: userId, receiverId: contactId },
                { senderId: contactId, receiverId: userId },
            ],
        })
        .sort({ timestamp: 1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit));

        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve messages' });
    }
});

router.get('/conversations/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const conversations = await Conversation.find({
            participants: userId,
        })
        .sort({ lastMessageTime: -1 }) 
        .populate('lastMessage'); 

        res.json(conversations);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve conversations' });
    }
});



module.exports = router;
