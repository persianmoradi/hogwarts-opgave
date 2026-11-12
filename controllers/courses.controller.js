import * as coursesRepo from "../repos/courses.repos.js"; // importér alle funktioner fra courses.repos.js
import * as teachersRepo from "../repos/teachers.repos.js";
import HTTPError from "../errorhandling/HTTPError.js";

export async function getCourses(req, res) {
        const courses = await coursesRepo.getCourses();
        res.status(200).json(courses);
}

export async function getCourseByID(req, res) {
        const course = await coursesRepo.getCourseByID(req.params.id);
        if (!course) {
            throw new HTTPError(404, "Course not found");
        }
        course.students = await coursesRepo.getStudentsInCourse(req.params.id);
        res.status(200).json(course);
}

export async function createCourse(req, res) {
        const { name, teacher_id } = req.body;
        if (!name) {
            throw new HTTPError(400, "name is required");
        }
        if (teacher_id !== undefined && teacher_id !== null && !(await teachersRepo.getTeacherByID(teacher_id))) {
            throw new HTTPError(404, "Teacher not found");
        }
        const course = await coursesRepo.createCourse(name, teacher_id);
        res.status(201).json(course);
}

export async function updateCourse(req, res) {
        const { name } = req.body;
        if (!name) {
            throw new HTTPError(400, "name is required");
        }
        const course = await coursesRepo.updateCourse(req.params.id, name);
        if (!course) {
            throw new HTTPError(404, "Course not found");
        }
        res.status(200).json(course);
}

export async function deleteCourse(req, res) {
        const deleted = await coursesRepo.deleteCourse(req.params.id);
        if (!deleted) {
            throw new HTTPError(404, "Course not found");
        }
        res.status(200).send({ message: "Course deleted" });
}
