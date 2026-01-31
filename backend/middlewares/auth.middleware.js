const jwt = require("jsonwebtoken");

const authMiddleware = (roles = []) => {
    return (req, res, next) => {
        try {
            // Extract token from Authorization header
            const token = req.headers?.authorization?.split(" ")[1];
            if (!token) {
                return res.status(400).json({ message: "Token not found, please login again" });
            }

            // Verify access token
            let decoded;
            try {
                decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            } catch (err) {
                if (err.message === "jwt expired") {
                    // Handle expired access token with refresh token
                    const refreshToken = req.headers?.refreshtoken?.split(" ")[1];
                    if (!refreshToken) {
                        return res.status(403).json({ message: "Refresh token missing, login again" });
                    }

                    try {
                        const refreshDecoded = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
                        // Generate new access token
                        const newAccessToken = jwt.sign(
                            { userID: refreshDecoded.userId, role: refreshDecoded.role },
                            process.env.JWT_SECRET_KEY,
                            { expiresIn: 1800 } // 30 minutes
                        );
                        decoded = jwt.verify(newAccessToken, process.env.JWT_SECRET_KEY);
                    } catch {
                        return res.status(403).json({ message: "Refresh token invalid or expired, login again" });
                    }
                } else {
                    return res.status(500).json({ message: "Token verification failed" });
                }
            }

            // Attach user info to request
            req.user = { id: decoded.userID, role: decoded.role };

            // Role-based access control (if roles were specified)
            if (roles.length > 0 && !roles.includes(decoded.role)) {
                return res.status(403).json({ message: "You are not authorized for this action" });
            }

            // Passed authentication & role check
            next();
        } catch (error) {
            console.error("Auth middleware error:", error);
            return res.status(500).json({ message: "Something went wrong in authentication" });
        }
    };
};

module.exports = authMiddleware;