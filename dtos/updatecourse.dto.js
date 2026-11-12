import * as z from "zod";

const updateCourseDto = z.object({
    name: z.string().min(1),
});

export default updateCourseDto;
