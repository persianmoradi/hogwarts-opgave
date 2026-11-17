import * as examsRepo from "../repos/exams.repos.js";
import * as coursesRepo from "../repos/courses.repos.js";
import * as studentsRepo from "../repos/students.repos.js";
import * as gradesRepo from "../repos/grades.repos.js";
import HTTPError from "../errorhandling/HTTPError.js";
import createExamDto from "../dtos/createexam.dto.js";
import updateExamDto from "../dtos/updateexam.dto.js";

async function assertGradeExists(letter) {
    if (!(await gradesRepo.getGradeByLetter(letter))) {
        throw new HTTPError(400, "Unknown grade");
    }
}

export async function getExams(req, res) {
    const exams = await examsRepo.getExams();
    res.status(200).json(exams);
}

export async function getExamByID(req, res) {
    const exam = await examsRepo.getExamByID(req.params.id);
    if (!exam) {
        throw new HTTPError(404, "Exam not found");
    }
    res.status(200).json(exam);
}

export async function createExam(req, res) {
    const input = req.body;
    const examData = createExamDto.parse(input);

    if (!(await coursesRepo.getCourseByID(examData.course_id))) {
        throw new HTTPError(404, "Course not found");
    }
    if (!(await studentsRepo.getStudentByID(examData.student_id))) {
        throw new HTTPError(404, "Student not found");
    }
    await assertGradeExists(examData.grade);

    const exam = await examsRepo.createExam(examData);
    res.status(201).json(exam);
}

export async function updateExam(req, res) {
    const input = req.body;
    const examData = updateExamDto.parse(input);

    await assertGradeExists(examData.grade);

    const exam = await examsRepo.updateExam(req.params.id, examData);
    if (!exam) {
        throw new HTTPError(404, "Exam not found");
    }
    res.status(200).json(exam);
}

export async function deleteExam(req, res) {
    const deleted = await examsRepo.deleteExam(req.params.id);
    if (!deleted) {
        throw new HTTPError(404, "Exam not found");
    }
    res.status(200).send({ message: "Exam deleted" });
}
