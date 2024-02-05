import express from "express";
import { addZakatUser, assignRoleToUser, getAllUsers } from "../Controller/UserController";

const router = express.Router();

router.post("/add", addZakatUser);
router.get("/", getAllUsers);
router.patch("/user/assign_role", assignRoleToUser);

export default router;
