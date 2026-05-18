import jwt from "jsonwebtoken"; // this imports the jwt so we can check the token

export const authMiddleware = (req, res, next) => { //then we get the sign-in or login info from the frontend? like when we access a page instead of logging in or signing up the user now has a token and now we gotta verify if the token is legit or not everytime he changes a page and we get the info of it here
  try {
    const authHeader = req.headers.authorization; // we check if the token exists for the user already and authorize him

    if (!authHeader || !authHeader.startsWith("Bearer ")) { // if the token doesnt exist or start bearer which i guess means that someone already has it then say no and send 401 status with no token provided
      return res.status(401).json({
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1]; // then 

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.userId,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};