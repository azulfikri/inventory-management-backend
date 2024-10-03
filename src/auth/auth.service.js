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

async function login(username, password) {
    const user = await userRepository.findUserByUsername(username);
    if (!user) {
        throw new Error("Invalid username or password");
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new Error("Invalid username or password");
    }
    return user;
}
module.exports = {register, login};