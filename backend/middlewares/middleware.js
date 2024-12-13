const { getAuth } = require("firebase-admin/auth");

async function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token not provided." });
  }

  try {
    const decodedToken = await getAuth().verifyIdToken(token);

    req.user = {
      id: decodedToken.uid, 
      email: decodedToken.email,
      name: decodedToken.name,
    };
    next();
  } catch (error) {
    console.error("Firebase token verification failed:", error.message);
    return res.status(403).json({ message: "Invalid or expired token.", error: error.message });
  }
}

module.exports = { authenticateToken };
