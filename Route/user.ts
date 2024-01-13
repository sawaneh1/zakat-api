import express from "express";
import { addUser, getAllUsers } from "../Controller/UserController";

const router = express.Router();

router.post("/add", addUser);
router.get("/", getAllUsers);

export default router;
