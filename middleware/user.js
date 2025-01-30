const { User } = require('../db/index');

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    try {
        const username = req.get("username");
        const password = req.get("password");

        const user = await User.findOne({ username, password });
        if (!user) {
            console.log("❌wrong username and password ❌");
            res.status(403).json({
                message: "wrong username and password"
            });
            return;
        }
        console.error("✅User Login Successfully✅");
        next();
    }
    catch (err) {
        console.warn("Server error in User DB");
        res.status(500).json({
            message: "Server Error in User DB"
        });
    }
}

module.exports = userMiddleware;