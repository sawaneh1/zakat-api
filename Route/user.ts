import express from "express";
import { addUser } from "../Controller/UserController";

const router = express.Router();

router.get("/user/add", addUser);

export default router;
