// Middleware for handling auth
const { Admin } = require('../db/index');
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    try {
        const username = req.headers["username"];
        const password = req.headers["password"];
        const user = await Admin.findOne({ username, password });
        console.log(user);
        if (!user) {
            console.log(" ❌ wrong username and password ❌");
            res.status(403);
            res.json({
                message: "wrong username and password "
            });
            return;
        }
        console.log("✅Admin Login Successfully✅");
        next();
    }
    catch (err) {
        res.status(500);
        console.warn("Server Error in Admin DB");
        res.json({
            message: "Server Error in Admin DB"
        });
    }
}

module.exports = adminMiddleware;