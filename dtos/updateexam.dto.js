import * as z from "zod";

// Kun karakteren kan rettes: fag og elev er selve identiteten på en eksamen
const updateExamDto = z.object({
    grade: z.string().length(1),
});

export default updateExamDto;
