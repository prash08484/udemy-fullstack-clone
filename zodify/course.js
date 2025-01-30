const zod = require('zod');

const VerifyCourse = zod.object({
    title: zod.string().min(1, { message: "title of course is required" }),
    description: zod.string().min(1, { message: "description of course is required" }),
    price: zod.number(),
    imageLink: zod.string().url({ message: "Incorrect format of url" }),
});

module.exports = VerifyCourse;
