import * as studentsRepo from "../repos/students.repos.js"; 
import * as housesRepo from "../repos/houses.repos.js";
import HTTPError from "../errorhandling/HTTPError.js";

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

        const { name, year, house_id } = req.body;
        if (!name) {
            throw new HTTPError(400, "name is required");
        }
        if (house_id !== undefined && house_id !== null && !(await housesRepo.getHouseByID(house_id))) {
            throw new HTTPError(404, "House not found");
        }
        const student = await studentsRepo.createStudent(name, year, house_id);
        res.status(201).json(student);
}

export async function updateStudent(req, res) {
        const { name, year, house_id } = req.body;
        if (!name) {
            throw new HTTPError(400, "name is required");
        }
        if (!(await studentsRepo.getStudentByID(req.params.id))) {
            throw new HTTPError(404, "Student not found");
        }
        if (house_id !== undefined && house_id !== null && !(await housesRepo.getHouseByID(house_id))) {
            throw new HTTPError(404, "House not found");
        }
        const student = await studentsRepo.updateStudent(req.params.id, name, year, house_id);
        res.status(200).json(student);
}

export async function deleteStudent(req, res) {
        const deleted = await studentsRepo.deleteStudent(req.params.id);
        if (!deleted) {
            throw new HTTPError(404, "Student not found");
        }
        res.status(200).send({ message: "Student deleted" });

}
