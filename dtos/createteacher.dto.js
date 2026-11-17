import * as z from "zod";

const createTeacherDto = z.object({
    name: z.string().min(1),
    house_id: z.int().nullable().optional(),
    employment_start: z.iso.date(),
    currently_active: z.boolean(),
    deceased: z.boolean(),
}).refine(
    // ISO-datoer kan sammenlignes som tekst
    (t) => !t.currently_active || t.employment_start <= new Date().toISOString().slice(0, 10),
    { message: "A teacher cannot be active before employment_start", path: ["currently_active"] }
);

export default createTeacherDto;
