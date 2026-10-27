import * as coursesRepo from "../repos/courses.repos.js"; // importér alle funktioner fra courses.repos.js
import * as teachersRepo from "../repos/teachers.repos.js";
import * as studentsRepo from "../repos/students.repos.js";

export async function getCourses(req, res) {
    try {
        const courses = await coursesRepo.getCourses();
        res.status(200).json(courses);
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error connecting to database" });
    }
}

// Henter ét course, inkl. navnet på dets teacher og listen af students (tom liste hvis ingen)
export async function getCourseByID(req, res) {
    try {
        const course = await coursesRepo.getCourseByID(req.params.id);
        if (!course) {
            return res.status(404).send({ message: "Course not found" });
        }
        course.students = await coursesRepo.getStudentsInCourse(req.params.id);
        res.status(200).json(course);
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error connecting to database" });
    }
}

// Body: { "name": "...", "teacher_id": 1 }   (teacher_id er valgfri, men skal findes hvis den er med)
export async function createCourse(req, res) {
    try {
        const { name, teacher_id } = req.body;
        if (!name) {
            return res.status(400).send({ message: "name is required" });
        }
        if (teacher_id !== undefined && teacher_id !== null && !(await teachersRepo.getTeacherByID(teacher_id))) {
            return res.status(404).send({ message: "Teacher not found" });
        }
        const course = await coursesRepo.createCourse(name, teacher_id);
        res.status(201).json(course);
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error connecting to database" });
    }
}

// Ændrer kun navnet på et course (teacher skiftes med updateCourseTeacher)
// Body: { "name": "..." }
export async function updateCourse(req, res) {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).send({ message: "name is required" });
        }
        const course = await coursesRepo.updateCourse(req.params.id, name);
        if (!course) {
            return res.status(404).send({ message: "Course not found" });
        }
        res.status(200).json(course);
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error connecting to database" });
    }
}

export async function deleteCourse(req, res) {
    try {
        const deleted = await coursesRepo.deleteCourse(req.params.id);
        if (!deleted) {
            return res.status(404).send({ message: "Course not found" });
        }
        res.status(200).send({ message: "Course deleted" });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error connecting to database" });
    }
}

// Body: { "teacher_id": 2 }
// 400 hvis teacher_id mangler, 404 hvis course eller teacher ikke findes
export async function updateCourseTeacher(req, res) {
    try {
        const { teacher_id } = req.body;
        if (!teacher_id) {
            return res.status(400).send({ message: "teacher_id is required" });
        }
        if (!(await coursesRepo.getCourseByID(req.params.id))) {
            return res.status(404).send({ message: "Course not found" });
        }
        if (!(await teachersRepo.getTeacherByID(teacher_id))) {
            return res.status(404).send({ message: "Teacher not found" });
        }
        const course = await coursesRepo.updateCourseTeacher(req.params.id, teacher_id);
        res.status(200).json(course);
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error connecting to database" });
    }
}


// --------------------- STUDENTS PÅ ET COURSE ---------------------

// Body: { "student_id": 3 }
// 400 hvis student_id mangler, 404 hvis course/student ikke findes, 409 hvis studenten allerede er på course
export async function addStudentToCourse(req, res) {
    try {
        const { student_id } = req.body;
        if (!student_id) {
            return res.status(400).send({ message: "student_id is required" });
        }
        if (!(await coursesRepo.getCourseByID(req.params.id))) {
            return res.status(404).send({ message: "Course not found" });
        }
        if (!(await studentsRepo.getStudentByID(student_id))) {
            return res.status(404).send({ message: "Student not found" });
        }
        const link = await coursesRepo.addStudentToCourse(req.params.id, student_id);
        res.status(201).json(link);
    }
    catch (error) {
        if (error.code === "23505") { // 23505 = unique violation (primærnøglen findes allerede)
            return res.status(409).send({ message: "Student already in course" });
        }
        console.log(error);
        res.status(500).send({ message: "Error connecting to database" });
    }
}

// Studenten slettes ikke - kun koblingen til course'et
export async function removeStudentFromCourse(req, res) {
    try {
        const removed = await coursesRepo.removeStudentFromCourse(req.params.id, req.params.studentId);
        if (!removed) {
            return res.status(404).send({ message: "Student is not in this course" });
        }
        res.status(200).send({ message: "Student removed from course" });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error connecting to database" });
    }
}
