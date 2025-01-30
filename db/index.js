const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://prashTeach:b1OFBnS8CaqYBPRH@dev-prashstudy-cluster.b8qfc.mongodb.net/info?retryWrites=true&w=majority', {})
    .then(() => {
        console.log("✅ DB Connected");
    })
    .catch((err) => {
        console.log("❌ DB Connection Failed");
    });


// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    publishedCourses: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Course' 
    }]
});


const UserSchema = new mongoose.Schema({
    // Schema definition here
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    purchasedCourses: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Course' 
    }]
});


const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    imageLink: {
        type: String,
        required: false,
    }

});

const Admin = mongoose.model('admin', AdminSchema);
const User = mongoose.model('user', UserSchema);
const Course = mongoose.model('course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}