import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  let token;

  try {
    //step1: check if authorization header exists
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      //step2: Extract token from header
      token = req.headers.authorization.split(" ")[1];
      //step3: Verify token
      const decoder = jwt.verify(token, process.env.JWT_SECRET);
      //step4: Get user from the token payload
      req.user = await User.findById(decoder.id).select("-password");
      //step5: Move to the next middleware / controller
      next();
    } else {
      return res.status(401).json({message: "Not authorized, not token"})
    }
  } catch (error) {
    return res.status(401).json({message: "Not authorized, token failed"});
  }
}

export default authMiddleware;