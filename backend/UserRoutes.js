import express from "express"
import {getAllData, login, updateScore } from "./UserController.js";

const router = express.Router();

router.post("/login", login);
router.post("/updateScore", updateScore);
router.get("/leaderboard", getAllData);

export default router;