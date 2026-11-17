import * as z from "zod";

// teacher_id er med vilje ikke med her: faget skifter ikke lærer via PUT
const updateCourseDto = z.object({
    name: z.string().min(1),
    type: z.enum(["core", "elective", "extra-curricular"]),
    level: z.enum(["OWL", "NEWT"]),
    school_year: z.int().min(1).max(7),
}).refine(
    (c) => (c.level === "OWL" ? c.school_year <= 5 : c.school_year >= 6),
    { message: "OWL courses are for school years 1-5, NEWT courses for 6-7", path: ["level"] }
);

export default updateCourseDto;
