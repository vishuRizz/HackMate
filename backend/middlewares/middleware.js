const { getAuth } = require("firebase-admin/auth"); 

async function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; 

  if (!token) {
    return res.status(401).json({ message: "Token not provided." });
  }

  try {
    // Verify Firebase token using Firebase Admin SDK
    const decodedToken = await getAuth().verifyIdToken(token);

    // Attach the decoded token (user details) to the request object
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Firebase token verification failed:", error.message);
    return res.status(403).json({ message: "Invalid or expired token.", error: error.message });
  }
}

module.exports = { authenticateToken };
