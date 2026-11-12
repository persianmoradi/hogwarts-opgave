import * as studentsRepo from "../repos/students.repos.js"; 
import * as housesRepo from "../repos/houses.repos.js";
import HTTPError from "../errorhandling/HTTPError.js";
import createStudentDto from "../dtos/createstudent.dto.js";
import updateStudentDto from "../dtos/updatestudent.dto.js";

export async function getStudents(req, res) {
        const students = await studentsRepo.getStudents();
        res.status(200).json(students);
}

export async function getStudentByID(req, res) {
        const student = await studentsRepo.getStudentByID(req.params.id);
        if (!student) {
            throw new HTTPError(404, "Student not found");
        }
        res.status(200).json(student);
}

export async function createStudent(req, res) {
    const input = req.body;
    const studentData = createStudentDto.parse(input);

    const { house_id } = studentData;
    if (house_id != null && !(await housesRepo.getHouseByID(house_id))) {
        throw new HTTPError(404, "House not found");
    }
    const student = await studentsRepo.createStudent(studentData);
    res.status(201).json(student);
}

export async function updateStudent(req, res) {
    const input = req.body;
    const studentData = updateStudentDto.parse(input);

    if (!(await studentsRepo.getStudentByID(req.params.id))) {
        throw new HTTPError(404, "Student not found");
    }
    const { house_id } = studentData;
    if (house_id != null && !(await housesRepo.getHouseByID(house_id))) {
        throw new HTTPError(404, "House not found");
    }
    const student = await studentsRepo.updateStudent(req.params.id, studentData);
    res.status(200).json(student);
}

export async function deleteStudent(req, res) {
        const deleted = await studentsRepo.deleteStudent(req.params.id);
        if (!deleted) {
            throw new HTTPError(404, "Student not found");
        }
        res.status(200).send({ message: "Student deleted" });

}
