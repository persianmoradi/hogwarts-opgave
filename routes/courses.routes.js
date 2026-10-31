import {Router} from "express";
import * as coursesController from "../controllers/courses.controller.js";

const router = Router();

router.get("/courses", coursesController.getCourses);
router.get("/courses/:id", coursesController.getCourseByID);
router.post("/courses", coursesController.createCourse);
router.put("/courses/:id", coursesController.updateCourse);
router.delete("/courses/:id", coursesController.deleteCourse);
router.put("/courses/:id/teacher", coursesController.updateCourseTeacher);
router.post("/courses/:id/students", coursesController.addStudentToCourse);
router.delete("/courses/:id/students/:studentId", coursesController.removeStudentFromCourse);

export default router;