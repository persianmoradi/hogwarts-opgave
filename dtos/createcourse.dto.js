import * as z from "zod";

const createCourseDto = z.object({
    name: z.string().min(1),
    teacher_id: z.int().nullable().optional(),
    type: z.enum(["core", "elective", "extra-curricular"]),
    level: z.enum(["OWL", "NEWT"]),
    school_year: z.int().min(1).max(7),
}).refine(
    (c) => (c.level === "OWL" ? c.school_year <= 5 : c.school_year >= 6),
    { message: "OWL courses are for school years 1-5, NEWT courses for 6-7", path: ["level"] }
);

export default createCourseDto;
