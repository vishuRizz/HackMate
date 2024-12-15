
const { getAuth } = require("firebase-admin/auth");

const authenticateFirebaseToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Authorization token is required." });
  }
  try {
    // Force verify the token (disable caching)
    const decodedToken = await getAuth().verifyIdToken(token, true);
    req.user = { id: decodedToken.uid, email: decodedToken.email, name: decodedToken.name };
    next();
  } catch (error) {
    console.error("Firebase token verification failed:", error.message);
    if (error.code === "auth/id-token-expired") {
      return res.status(401).json({ message: "Session expired. Please refresh your token or sign in again." });
    }
    res.status(401).json({ message: "Invalid or expired token.", error: error.message });
  }
};


module.exports = { authenticateFirebaseToken };







// const { getAuth } = require("firebase-admin/auth");

// const authenticateFirebaseToken = async (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ message: "Authorization token is required." });
//   }

//   try {
//     // Verify ID token
//     const decodedToken = await getAuth().verifyIdToken(token);

//     // Attach user info to the request object
//     req.user = { id: decodedToken.uid, email: decodedToken.email, name: decodedToken.name };
//     next();
//   } catch (error) {
//     console.error("Firebase token verification failed:", error.message);

//     if (error.code === "auth/id-token-expired") {
//       return res.status(401).json({
//         message: "Session expired. Please refresh your token or sign in again.",
//       });
//     }

//     res.status(401).json({ message: "Invalid or expired token.", error: error.message });
//   }
// };

// module.exports = { authenticateFirebaseToken };







