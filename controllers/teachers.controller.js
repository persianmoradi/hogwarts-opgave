import * as teachersRepo from "../repos/teachers.repos.js"; // importér alle funktioner fra teachers.repos.js
import * as housesRepo from "../repos/houses.repos.js";
import HTTPError from "../errorhandling/HTTPError.js";

export async function getTeachers(req, res) {
        const teachers = await teachersRepo.getTeachers();
        res.status(200).json(teachers);
}

export async function getTeacherByID(req, res) {
    const teacher = await teachersRepo.getTeacherByID(req.params.id);
     
    if (!teacher) throw new HTTPError(404, "Teacher not found");
    
    res.status(200).json(teacher);
}

export async function createTeacher(req, res) {
        const { name, house_id } = req.body;
        if (!name) {
            throw new HTTPError(400, "name is required");
        }
        if (house_id !== undefined && house_id !== null && !(await housesRepo.getHouseByID(house_id))) {
            throw new HTTPError(404, "House not found");
        }
        const teacher = await teachersRepo.createTeacher(name, house_id);
        res.status(201).json(teacher);
}

export async function updateTeacher(req, res) {
        const { name, house_id } = req.body;
        if (!name) {
            throw new HTTPError(400, "name is required");
        }
        if (!(await teachersRepo.getTeacherByID(req.params.id))) {
            throw new HTTPError(404, "Teacher not found");
        }
        if (house_id !== undefined && house_id !== null && !(await housesRepo.getHouseByID(house_id))) {
            throw new HTTPError(404, "House not found");
        }
        const teacher = await teachersRepo.updateTeacher(req.params.id, name, house_id);
        res.status(200).json(teacher);
}

export async function deleteTeacher(req, res) {
        const deleted = await teachersRepo.deleteTeacher(req.params.id);
        if (!deleted) {
            throw new HTTPError(404, "Teacher not found");
        }
        res.status(200).send({ message: "Teacher deleted" });
}
