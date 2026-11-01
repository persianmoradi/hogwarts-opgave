import * as studentsRepo from "../repos/students.repos.js"; 
import * as housesRepo from "../repos/houses.repos.js";

export async function getStudents(req, res) {
    try {
        const students = await studentsRepo.getStudents();
        res.status(200).json(students);
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error connecting to database" });
    }
}

export async function getStudentByID(req, res) {
    try {
        const student = await studentsRepo.getStudentByID(req.params.id);
        if (!student) {
            return res.status(404).send({ message: "Student not found" });
        }
        res.status(200).json(student);
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error connecting to database" });
    }
}

export async function createStudent(req, res) {
    try {
        const { name, year, house_id } = req.body;
        if (!name) {
            return res.status(400).send({ message: "name is required" });
        }
        if (house_id !== undefined && house_id !== null && !(await housesRepo.getHouseByID(house_id))) {
            return res.status(404).send({ message: "House not found" });
        }
        const student = await studentsRepo.createStudent(name, year, house_id);
        res.status(201).json(student);
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error connecting to database" });
    }
}

export async function updateStudent(req, res) {
    try {
        const { name, year, house_id } = req.body;
        if (!name) {
            return res.status(400).send({ message: "name is required" });
        }
        if (!(await studentsRepo.getStudentByID(req.params.id))) {
            return res.status(404).send({ message: "Student not found" });
        }
        if (house_id !== undefined && house_id !== null && !(await housesRepo.getHouseByID(house_id))) {
            return res.status(404).send({ message: "House not found" });
        }
        const student = await studentsRepo.updateStudent(req.params.id, name, year, house_id);
        res.status(200).json(student);
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error connecting to database" });
    }
}

export async function deleteStudent(req, res) {
    try {
        const deleted = await studentsRepo.deleteStudent(req.params.id);
        if (!deleted) {
            return res.status(404).send({ message: "Student not found" });
        }
        res.status(200).send({ message: "Student deleted" });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error connecting to database" });
    }
}
