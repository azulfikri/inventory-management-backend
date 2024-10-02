// dikhususkan untuk pemrosesan logika

const bcrypt = require("bcrypt");
const userRepository = require("./auth.repository");

async function register(username, email, password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = {
            username,
            email,
            password: hashedPassword,
            role: "USER",
        };
        const newUser = await userRepository.createUser(user);
        return newUser;
    } catch (error) {
        throw new Error("Failed to register user");
    }
}

module.exports = {register};