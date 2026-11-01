import * as coursesRepo from "../repos/courses.repos.js"; // importér alle funktioner fra courses.repos.js
import * as teachersRepo from "../repos/teachers.repos.js";

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
