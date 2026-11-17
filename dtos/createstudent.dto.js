import * as z from "zod";

const createStudentDto = z.object({
    name: z.string().min(1),
    birthday: z.iso.date(),
    school_year: z.int().min(1).max(7),
    house_id: z.int().nullable().optional(),
});

export default createStudentDto;
