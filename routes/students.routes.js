import {Router} from "express";
import * as studentsController from "../controllers/students.controller.js";

const router = Router();

router.get("/students", studentsController.getStudents);
router.get("/students/:id", studentsController.getStudentByID);
router.post("/students", studentsController.createStudent);
router.put("/students/:id", studentsController.updateStudent);
router.delete("/students/:id", studentsController.deleteStudent);

export default router;