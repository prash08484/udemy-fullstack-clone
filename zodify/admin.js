// const zod = require('zod');

// const createAdmin = zod.object({
//     username: zod.string().min(1, { message: "username can't be empty"}),
//     password: zod.string().min(1, { message: "password can't empty" })
// });

// module.exports = {
//     VerifyAdmin: createAdmin
// };

// don't use VerfilyAdmin: createAdmin like things 

const zod = require('zod');

const VerifyAdmin = zod.object({
    username: zod.string().min(3, { message: "Username is required" }),
    password: zod.string().min(4, { message: "Password must be at least 4 characters" }),
});

module.exports =VerifyAdmin;  // Exporting correctly
