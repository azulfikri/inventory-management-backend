const express = require("express");
const router = express.Router();
const authService = require("./auth.service");

router.post("/register", async (req, res, nex) => {
    const { username, email, password } = req.body;

    try {
        const newUser = await authService.register(username, email, password);

        res.status(201).json({ data: { username: newUser.username, email: newUser.email }, message: "Registration Success!"});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post("/login", async (req, res, next) => {
    const {username, password} = req.body;

    try {
        const {user, token} = await authService.login(username, password);

        res.status(200).json({ data: {username: user.username, token, role: user.role}, message: "Login Success!"});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});
module.exports = router;