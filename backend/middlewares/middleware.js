const jwt =  require("jsonwebtoken");
 const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; 
  if (!token) return res.status(401).json({ message: "Access denied, no token provided." });

  jwt.verify(token, JWT_SECRET="chudai", (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token." });
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };