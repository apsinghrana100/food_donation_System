import jwt from 'jsonwebtoken';

const UserAuthenticationVerify = (req, res, next) => {
  console.log("I am auth user");
  
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log(token);

    if (!token) {
      console.log("I am auth user");
      return res.status(401).json({ msg: "Unauthorized: No Token Provided" });
    }

    jwt.verify(token, "Accesskey", (err, decoded) => {
      if (err) {
        return res.status(403).json({ msg: "Forbidden: Invalid or Expired Token" });
      }
      
      req.subid = decoded.sub; // ✅ Now correctly accessing decoded token data
      req.email = decoded.email;
      req.name = decoded.name;
      console.log("user sub id",req.subid,token);
      next();
    });

  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export default UserAuthenticationVerify;
