import { Router } from "express";
import * as gradesController from "../controllers/grades.controller.js";

const router = Router();

// Read only: karaktersystemet kan ikke ændres fra klienten
router.get("/grades", gradesController.getGrades);
router.get("/grades/:letter", gradesController.getGradeByLetter);

export default router;
