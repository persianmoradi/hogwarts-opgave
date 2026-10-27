import * as teachersRepo from "../repos/teachers.repos.js"; // importér alle funktioner fra teachers.repos.js
import * as housesRepo from "../repos/houses.repos.js";

export async function getTeachers(req, res) {
    try {
        const teachers = await teachersRepo.getTeachers();
        res.status(200).json(teachers);
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error connecting to database" });
    }
}

export async function getTeacherByID(req, res) {
    try {
        const teacher = await teachersRepo.getTeacherByID(req.params.id);
        if (!teacher) {
            return res.status(404).send({ message: "Teacher not found" });
        }
        res.status(200).json(teacher);
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error connecting to database" });
    }
}

// Body: { "name": "...", "house_id": 1 }   (house_id er valgfri, men skal findes hvis den er med)
export async function createTeacher(req, res) {
    try {
        const { name, house_id } = req.body;
        if (!name) {
            return res.status(400).send({ message: "name is required" });
        }
        if (house_id !== undefined && house_id !== null && !(await housesRepo.getHouseByID(house_id))) {
            return res.status(404).send({ message: "House not found" });
        }
        const teacher = await teachersRepo.createTeacher(name, house_id);
        res.status(201).json(teacher);
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error connecting to database" });
    }
}

// 1. id'et hentes fra routen  2. teacheren findes i databasen (404)  3. name og house ændres
export async function updateTeacher(req, res) {
    try {
        const { name, house_id } = req.body;
        if (!name) {
            return res.status(400).send({ message: "name is required" });
        }
        if (!(await teachersRepo.getTeacherByID(req.params.id))) {
            return res.status(404).send({ message: "Teacher not found" });
        }
        if (house_id !== undefined && house_id !== null && !(await housesRepo.getHouseByID(house_id))) {
            return res.status(404).send({ message: "House not found" });
        }
        const teacher = await teachersRepo.updateTeacher(req.params.id, name, house_id);
        res.status(200).json(teacher);
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error connecting to database" });
    }
}

export async function deleteTeacher(req, res) {
    try {
        const deleted = await teachersRepo.deleteTeacher(req.params.id);
        if (!deleted) {
            return res.status(404).send({ message: "Teacher not found" });
        }
        res.status(200).send({ message: "Teacher deleted" });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error connecting to database" });
    }
}
