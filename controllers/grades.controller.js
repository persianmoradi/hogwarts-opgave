import * as gradesRepo from "../repos/grades.repos.js";
import HTTPError from "../errorhandling/HTTPError.js";

export async function getGrades(req, res) {
    const grades = await gradesRepo.getGrades();
    res.status(200).json(grades);
}

export async function getGradeByLetter(req, res) {
    const grade = await gradesRepo.getGradeByLetter(req.params.letter);
    if (!grade) {
        throw new HTTPError(404, "Grade not found");
    }
    res.status(200).json(grade);
}
