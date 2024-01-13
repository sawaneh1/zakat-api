import express from "express";
import { addRole, getAllRoles } from "../Controller/RoleConntreoller";

const router = express.Router();

router.post("/add", addRole);
router.get("/", getAllRoles);

export default router;
