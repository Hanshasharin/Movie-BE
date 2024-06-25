// middleware/authMiddleware.js
import dotenv from 'dotenv';


export const checkAuthKey = (req, res, next) => {
    const authKey = req.headers['authorization-key'];
    const validAuthKey = process.env.AUTHORIZATION_KEY;
  
    if (authKey && authKey === validAuthKey) {
      next();
    } else {
      res.status(403).json({ message: "Forbidden: Invalid authorization key" });
    }
  };
  