import express from "express";

import { addUser, loginUser } from "../Controller/auth";

const router = express.Router();

router.post("/login", loginUser);
router.post("/add/guest", addUser );

export default router;
