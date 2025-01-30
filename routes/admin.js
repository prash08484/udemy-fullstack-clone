const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const VerfiyCourse = require('../zodify/course');
const VerfiyAdmin = require('../zodify/admin');
const { Admin, Course } = require('../db/index');


// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    try {
        const info = req.body;
        const filterInfo = VerfiyAdmin.safeParse(info);
        if (!filterInfo.success) {
            res.status(500);
            res.send({
                message: "wrong input format"
            });
            return;
        }
        else {
            await Admin.create({
                username: info.username,
                password: info.password
            });
            res.status(200);
            res.json({
                message: "Admin added successfully"
            });
        }

    }
    catch (err) {
        res.status(500);
        res.json({
            message: "Fails to add admin " + err
        });
    }

});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic

    try {

        // verify through zod 
        const info = req.body;
        const filterInfo = VerfiyCourse.safeParse(info);
        const { title, description, price, imageLink } = info;
        if (!filterInfo.success) {
            console.warn("course input not in correct format ");
            res.status(500);
            res.json({
                message: "coures input not in correct format"
            });
            return;
        }
        console.error(" ✅ zodify login of admin ✅");
        await Course.create({
            title: title,
            description: description,
            price: price,
            imageLink: imageLink,
        });
        res.status(200);
        res.json({
            message: "Successfully added coures"
        });
    }
    catch {
        console.error("Server error in adding coures ");
        res.status(500).json({
            message: "Server error in adding the course "
        });
    }
});

router.get('/courses', adminMiddleware,async (req, res) => {
    // Implement fetching all courses logic
    try {
        const courses = await Course.find({});
        res.status(200).json({
            courses
        });
    }
    catch {
        res.status(500);
        res.json({
            message: "Server Error while fetching the courese by admin"
        });
        console.error("Server Error while fetching the courese by admin ");
    }
});

module.exports = router;