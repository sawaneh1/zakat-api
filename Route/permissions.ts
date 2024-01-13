import express from "express";
import { addRole, getAllRoles } from "../Controller/RoleConntreoller";
import { addPermission, getAllPermissions } from "../Controller/PermissionControler";

const router = express.Router();

router.post("/add", addPermission);
router.get("/", getAllPermissions);

export default router;
