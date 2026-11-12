import * as z from "zod";

const updateTeacherDto = z.object({
    name: z.string().min(1),
    house_id: z.int().nullable().optional(),
});

export default updateTeacherDto;
