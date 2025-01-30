const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const VerifyUser = require('../zodify/admin');
const VerfiyCourse = require('../zodify/course');
const { User, Course } = require('../db/index');

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    try {
        const info = req.body;
        const fiterInfo = VerifyUser.safeParse(info);
        if (!fiterInfo.success) {
            console.log("Wrong input format");
            res.status(403);
            res.json({
                messge: "Wrong input format "
            });
            return;
        }
        else {
            // add in mongoDB
            console.log("✅User Signup");
            await User.create({
                username: info.username,
                password: info.password
            });
            res.status(200);
            res.json({
                message: "Successfully added the user"
            });
        }
    }
    catch (err) {
        res.status(500);
        console.log("Failse to add user ", err);
        res.send({
            message: "Fails to add user "
        });
    }
});


router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    try {
        const courses = await Course.find({});
        res.status(200).json({
            courses
        });
    }
    catch {
        res.status(500);
        res.json({
            message: "Server Error while fetching the courese by user"
        });
        console.error("Server Error while fetching the courese by user");
    }
});


router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    try {
        const courseId = req.params.courseId;
        console.log(courseId);
        console.log("no error in fetching course");
        const course = await Course.findById(courseId);
        if (!course) {
            res.status(404).json({
                message: "This course is not in db"
            });
            return;
        }
        const username = req.headers["username"];
        const password = req.headers["password"];

        const user = await User.findOne({ username, password });

        user.purchasedCourses.push(courseId);
        await user.save();
        res.status(200).json({
            message: "Purchase Successfully"
        });
    }
    catch {
        res.status(401).json({
            message: "Purchase Failed "
        });
        console.log("Failed purchase ");
    }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic

    try {
        const username = req.headers["username"];
        const password = req.headers["password"];
        const user = await User.findOne({ username, password });
        const courseid = user.purchasedCourses;

        let courses = [];
        for (let i = 0; i < courseid.length; i++) {
            courses.push(await Course.findById(courseid[i]));
        }
        console.log("✅Admin Login Successfully✅");
        res.status(200).json(
            courses
        );
    }
    catch {
        res.status(401).json({
            message: "Fetching Failed of purchased courses "
        });
        console.log("Fetching Failed of purchased courses");
    }

});

module.exports = router