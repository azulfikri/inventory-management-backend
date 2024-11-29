const express = require("express");
const router = express.Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  editUserById,
  deleteUserById,
} = require("./user.service");
// const { user } = require("../db");

router.post("/", async (req, res) => {
  try {
    const newUserData = req.body;
    const newUser = await createUser(newUserData);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await getUserById(userId);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const userData = req.body;
    const updatedUser = await editUserById(userId, userData);

    delete updatedUser.password;
    res
      .status(200)
      .send({ data: updatedUser, message: "User Berhasil Diupdate" });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    await deleteUserById(userId);
    res.status(200).json({ message: "User Telah Dihapus" });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
