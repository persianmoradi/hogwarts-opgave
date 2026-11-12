import * as z from "zod";

const createCourseDto = z.object({
    name: z.string().min(1),
    teacher_id: z.int().nullable().optional(),
});

export default createCourseDto;
