import * as z from "zod";

const createExamDto = z.object({
    course_id: z.int(),
    student_id: z.int(),
    grade: z.string().length(1),
});

export default createExamDto;
