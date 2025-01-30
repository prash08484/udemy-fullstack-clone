# PrashStudy - Online Course Selling App

## 📌 Introduction
PrashStudy is a full-stack online course-selling platform where admins can create and manage courses, and users can browse, purchase, and access learning materials. The app is built using the **MERN stack** (MongoDB, Express, React, Node.js) and includes **authentication, course management, and user enrollment features**.

## 🚀 Features
- **Admin Panel**: Create, update, and delete courses
- **User Authentication**: Secure login and signup system
- **Course Purchase**: Users can buy courses and access them anytime
- **Course Management**: Admins can manage course details
- **Secure Payments** (Future Enhancement)
- **Responsive UI** for seamless browsing experience

## 🛠️ Tech Stack
- **Frontend**: React, Tailwind CSS
- **Backend**: Express.js, Node.js
- **Database**: MongoDB with Mongoose ORM
- **Authentication**: JWT for secure access
- **Validation**: Zod for input validation
- **ORM**: Prisma (if using PostgreSQL as an alternative database)

## ⚙️ Installation

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/prashstudy.git
cd prashstudy
```

### 2️⃣ Install Dependencies
#### Backend
```sh
cd backend
npm install
```

#### Frontend
```sh
cd ../frontend
npm install
```

### 3️⃣ Setup Environment Variables
Create a `.env` file in the backend directory with:
```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

### 4️⃣ Run the Development Server
#### Start Backend Server
```sh
cd backend
npm start
```

#### Start Frontend Server
```sh
cd frontend
npm start
```

## 🔥 API Endpoints

### 🛠️ **Admin Routes**
| Method | Endpoint | Description |
|--------|-------------|-------------|
| POST   | `/admin/signup` | Admin signup |
| POST   | `/admin/login` | Admin login |
| POST   | `/admin/courses` | Create a course |
| GET    | `/admin/courses` | View all courses |

### 👨‍🎓 **User Routes**
| Method | Endpoint | Description |
|--------|-------------|-------------|
| POST   | `/users/signup` | User signup |
| POST   | `/users/login` | User login |
| GET    | `/users/courses` | View available courses |
| POST   | `/users/courses/:courseId` | Purchase a course |
| GET    | `/users/purchasedCourses` | View purchased courses |

## 🛠️ Database Schema

### **User Schema**
```js
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});
```

### **Course Schema**
```js
const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    imageLink: { type: String }
});
```

## 🛡️ Authentication & Security
- JWT-based authentication for users and admins
- Passwords hashed with bcrypt
- Input validation with **Zod** to prevent invalid requests

## 📌 Future Enhancements
- **Payment Integration** (Stripe/Razorpay)
- **Course Progress Tracking**
- **Video Hosting & Streaming**
- **Interactive Quizzes & Assignments**

## 🤝 Contributing
Feel free to fork the repo, raise issues, or submit PRs!

## 📜 License
MIT License

---
💡 Built with ❤️ by **Prashant Yadav**

