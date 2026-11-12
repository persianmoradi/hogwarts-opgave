import * as teachersRepo from "../repos/teachers.repos.js"; // importér alle funktioner fra teachers.repos.js
import * as housesRepo from "../repos/houses.repos.js";
import HTTPError from "../errorhandling/HTTPError.js";
import createTeacherDto from "../dtos/createteacher.dto.js";
import updateTeacherDto from "../dtos/updateteacher.dto.js";

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
    const input = req.body;
    const teacherData = createTeacherDto.parse(input);

    const { house_id } = teacherData;
    if (house_id != null && !(await housesRepo.getHouseByID(house_id))) {
        throw new HTTPError(404, "House not found");
    }
    const teacher = await teachersRepo.createTeacher(teacherData);
    res.status(201).json(teacher);
}

export async function updateTeacher(req, res) {
    const input = req.body;
    
    const teacherData = updateTeacherDto.parse(input);

    if (!(await teachersRepo.getTeacherByID(req.params.id))) {
        throw new HTTPError(404, "Teacher not found");
    }
    const { house_id } = teacherData;
    if (house_id != null && !(await housesRepo.getHouseByID(house_id))) {
        throw new HTTPError(404, "House not found");
    }
    const teacher = await teachersRepo.updateTeacher(req.params.id, teacherData);
    res.status(200).json(teacher);
}

export async function deleteTeacher(req, res) {
        const deleted = await teachersRepo.deleteTeacher(req.params.id);
        if (!deleted) {
            throw new HTTPError(404, "Teacher not found");
        }
        res.status(200).send({ message: "Teacher deleted" });
}
