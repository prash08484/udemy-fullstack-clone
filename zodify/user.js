const zod = require('zod');

const VerifyUser = zod.object({
    username: zod.string().min(1, "username can't be empty"),
    password: zod.string().min(1, "password can't be empty")
});

module.exports = VerifyUser;
