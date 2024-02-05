import express from "express";
import { addRole, assignPermissionToRole, getAllRoles } from "../Controller/RoleConntreoller";

const router = express.Router();

router.post("/add", addRole);
router.get("/", getAllRoles);
router.patch("/role/assign", assignPermissionToRole);

export default router;
