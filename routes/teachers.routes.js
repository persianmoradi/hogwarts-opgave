import { Router } from "express";
import * as teachersController from "../controllers/teachers.controller.js";

const router = Router();

router.get("/teachers", teachersController.getTeachers);
router.get("/teachers/:id", teachersController.getTeacherByID);
router.post("/teachers", teachersController.createTeacher);
router.put("/teachers/:id", teachersController.updateTeacher);
router.delete("/teachers/:id", teachersController.deleteTeacher);

export default router;