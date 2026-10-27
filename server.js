// =====================================================================
//  HOGWARTS COURSE MANAGEMENT SYSTEM - backend (Express + PostgreSQL)
// =====================================================================
//  Opbygning:  server.js (routes)  ->  controllers/ (HTTP, statuskoder)  ->  repos/ (SQL)

//  Statuskoder der bruges:
//    200 OK  |  201 Created  |  400 Mangler data  |  404 Findes ikke  |  409 Findes allerede  |  500 Databasefejl

// --------------------- OPSÆTNING OG IMPORT ---------------------

import express from "express";
import * as housesController from "./controllers/houses.controller.js";
import * as teachersController from "./controllers/teachers.controller.js";
import * as studentsController from "./controllers/students.controller.js";
import * as coursesController from "./controllers/courses.controller.js";

const app = express();
const port = 3000;
app.use(express.json()); // gør at vi kan læse JSON i req.body (POST og PUT)

// =====================================================================
//  HOUSES  (kun læsning - de fire houses ligger fast i databasen)
//  Tabel: houses (id, name, colors, founder)
// =====================================================================

// GET /houses - hent alle houses
app.get("/houses", housesController.getHouses);

// GET /houses/:id - hent ét house
app.get("/houses/:id", housesController.getHouseByID);


// =====================================================================
//  TEACHERS  (fuld CRUD)
//  Tabel: teachers (id, name, house_id)
// =====================================================================

// GET /teachers - hent alle teachers
app.get("/teachers", teachersController.getTeachers);

// GET /teachers/:id - hent én teacher
app.get("/teachers/:id", teachersController.getTeacherByID);

// POST /teachers - opret en teacher
// Body: { "name": "...", "house_id": 1 }
app.post("/teachers", teachersController.createTeacher);

// PUT /teachers/:id - opdater en teacher
// Body: { "name": "...", "house_id": 1 }
app.put("/teachers/:id", teachersController.updateTeacher);

// DELETE /teachers/:id - slet en teacher
app.delete("/teachers/:id", teachersController.deleteTeacher);


// =====================================================================
//  STUDENTS  (fuld CRUD)
//  Tabel: students (id, name, year, house_id)
// =====================================================================

// GET /students - hent alle students
app.get("/students", studentsController.getStudents);

// GET /students/:id - hent én student
app.get("/students/:id", studentsController.getStudentByID);

// POST /students - opret en student
// Body: { "name": "...", "year": 1, "house_id": 1 }
app.post("/students", studentsController.createStudent);

// PUT /students/:id - opdater en student
// Body: { "name": "...", "year": 1, "house_id": 1 }
app.put("/students/:id", studentsController.updateStudent);

// DELETE /students/:id - slet en student
app.delete("/students/:id", studentsController.deleteStudent);


// =====================================================================
//  COURSES  (CRUD + skift af teacher)
//  Tabel: courses (id, name, teacher_id)
//  Relation: mange courses -> én teacher (via teacher_id)
// =====================================================================

// GET /courses - hent alle courses
app.get("/courses", coursesController.getCourses);

// GET /courses/:id - hent ét course, inkl. navnet på dets teacher og listen af students
app.get("/courses/:id", coursesController.getCourseByID);

// POST /courses - opret et course
// Body: { "name": "...", "teacher_id": 1 }
app.post("/courses", coursesController.createCourse);

// PUT /courses/:id - ændr kun navnet på et course
// Body: { "name": "..." }
// (teacher skiftes med PUT /courses/:id/teacher herunder)
app.put("/courses/:id", coursesController.updateCourse);

// DELETE /courses/:id - slet et course
app.delete("/courses/:id", coursesController.deleteCourse);

// PUT /courses/:id/teacher - skift teacher på et course
// Body: { "teacher_id": 2 }
app.put("/courses/:id/teacher", coursesController.updateCourseTeacher);


// =====================================================================
//  COURSES <-> STUDENTS  (mange-til-mange via koblingstabellen)
//  Tabel: course_students (course_id, student_id)
//  Primærnøglen (course_id, student_id) forhindrer dubletter
// =====================================================================

// POST /courses/:id/students - tilføj en student til et course
// Body: { "student_id": 3 }
app.post("/courses/:id/students", coursesController.addStudentToCourse);

// DELETE /courses/:id/students/:studentId - fjern en student fra et course
// (studenten slettes ikke - kun koblingen til course'et)
app.delete("/courses/:id/students/:studentId", coursesController.removeStudentFromCourse);


// =====================================================================
//  START SERVEREN
// =====================================================================

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
