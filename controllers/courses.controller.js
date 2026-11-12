import * as coursesRepo from "../repos/courses.repos.js"; // importér alle funktioner fra courses.repos.js
import * as teachersRepo from "../repos/teachers.repos.js";
import HTTPError from "../errorhandling/HTTPError.js";
import createCourseDto from "../dtos/createcourse.dto.js";
import updateCourseDto from "../dtos/updatecourse.dto.js";

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
    const input = req.body;
    const courseData = createCourseDto.parse(input);

    const { teacher_id } = courseData;
    if (teacher_id != null && !(await teachersRepo.getTeacherByID(teacher_id))) {
        throw new HTTPError(404, "Teacher not found");
    }
    const course = await coursesRepo.createCourse(courseData);
    res.status(201).json(course);
}

export async function updateCourse(req, res) {
    const input = req.body;
    const courseData = updateCourseDto.parse(input);

    const course = await coursesRepo.updateCourse(req.params.id, courseData);
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
