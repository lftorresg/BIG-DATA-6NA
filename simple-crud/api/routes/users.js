import express from "express";
import { deleteUsers, getUsers, insertUsers, updateUsers } from "../controllers/user.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/", insertUsers);
router.put("/:id", updateUsers);
router.delete("/:id", deleteUsers);

export default router;