import * as z from "zod";

const createStudentDto = z.object({
    name: z.string().min(1),
    year: z.int().nullable().optional(),
    house_id: z.int().nullable().optional(),
});

export default createStudentDto;
