const jwt = require("jsonwebtoken");

const authorizeAdmin = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "ADMIN") {
      return res.status(403).json({ message: "Unauthorized" });
    }
    next();
  } catch (error) {
    console.error("Authorization error:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authorizeAdmin;
