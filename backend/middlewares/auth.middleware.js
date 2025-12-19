const jwt = require("jsonwebtoken")
const authMiddleware = (role) => {
    return (req, res, next) => {
        let decoded;
        try {
            let token = req.headers?.authorization?.split(" ")[1];
            console.log(token)
            if (token) {
                decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
                console.log(decoded, "i am decoded");

                console.log("Passed through auth middleware");
            } else {
                res.status(400).json({ message: "token not found, please login again" })
            }
        } catch (err) {
            if (err.message == "jwt expired") {
                // we need to generate new access token with the help of refresh token 
                //check the validity of refresh token  and issue new access token
                let refreshToken = req.headers?.refreshtoken?.split(" ")[1];
                let refreshTokenDecoded = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
                if(refreshTokenDecoded){
                    console.log("Access token expired, new token generated")
                    //userId and role from refreshTokenDecoded
                    let newAccessToken = jwt.sign({
                         userID: refreshTokenDecoded.userId, role: refreshTokenDecoded.role },
                          process.env.JWT_SECRET_KEY, {expiresIn : 1800});
                    decoded = jwt.verify(newAccessToken, process.env.JWT_SECRET_KEY);
                }else{
                    res.status(403).json({ message: "token expired, login again" })
                }
            } else {
                res.status(500).json({ message: "something went wrong" })
            }
        }
        if (decoded) {
            //attach the decrypted data to the request
            //  if (role == decoded.role) for giving access to multiple roles
            if (role.includes(decoded.role)) {
                req.user = decoded.userID;
                console.log(req.user, "is this correct")
                next();
            } else {
                res.status(401).json({ msg: "role is not matching" })
            }
        } else {
            res.status(403).json({ message: "login failed please login again" })
        }
    }
}

module.exports = authMiddleware;