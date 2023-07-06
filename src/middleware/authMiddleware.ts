import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  userId?: string; // Custom property to hold the user ID
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization');

    if (!token) {
      return res.status(401).json({ message: 'Auth Error: No token provided.' });
    }

    // Verify token
    const secretKey = process.env.JWT_SECRET || ""; // Replace with your secret key
    jwt.verify(token, secretKey, (error: any, decoded: any) => {
      if (error) {
        return res.status(401).json({ message: 'Auth Error: Token is not valid.' });
      }

      // If token is valid, you can add additional data to the request object
      req.userId = decoded.userId; // Example: attaching the user ID to req.userId

      next();
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export default authMiddleware;
