
import jwt from "jsonwebtoken"


const jwtVerify = async (req, res, next) => {
    const { authorization } = req?.headers || {}

    if (!authorization) {
        return res.status(401).json({
            "success": false,
            "message": "Unauthorized Access!",
        });
    }

    try {
        const authorizationToken = authorization.split(" ")[1]
        const decoded = jwt.verify(authorizationToken, process.env.SECRET_HASH)

        if (!decoded) {
            return res.status(401).json({
                "success": false,
                "message": "Unauthorized Access!",
            });
        }
        req.decoded = decoded;
        next()
        return

    } catch (error) {
        console.log("jwt verify error ||", error.message);
        return res.status(500).json({
            "success": false,
            "message": "internal server error!"
        });
    }
}

export default jwtVerify
