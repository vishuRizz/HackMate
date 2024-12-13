const { getAuth } = require("firebase-admin/auth");

// Middleware to authenticate Firebase token
 const authenticateFirebaseToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
  
    if (!token) {
      return res.status(401).json({ message: "Authorization token is required." });
    }
  
    try {
      const decodedToken = await getAuth().verifyIdToken(token);
      req.user = { id: decodedToken.uid, email: decodedToken.email, name: decodedToken.name };
      next();
    } catch (error) {
      console.error("Firebase token verification failed:", error.message);
      res.status(401).json({ message: "Invalid or expired token.", error: error.message });
    }
  };

  module.exports = { authenticateFirebaseToken };
  