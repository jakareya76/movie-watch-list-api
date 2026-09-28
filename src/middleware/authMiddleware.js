import jwt from "jsonwebtoken";
import { prisma } from "../config/db.js";

export const authMiddleware = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookie?.jwt) {
    token = req.cookie.jwt;
  }

  if (!token) {
    return res.status(401).json({
      error: "Not authorized",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    if (!user) {
      return res.status(401).json({
        error: "Not authorized",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      error: "Not authorized",
    });
  }
};
