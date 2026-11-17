import { Router } from "express";
import * as examsController from "../controllers/exams.controller.js";

const router = Router();

router.get("/exams", examsController.getExams);
router.get("/exams/:id", examsController.getExamByID);
router.post("/exams", examsController.createExam);
router.put("/exams/:id", examsController.updateExam);
router.delete("/exams/:id", examsController.deleteExam);

export default router;
