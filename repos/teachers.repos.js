import pool from "../db.js";

export async function getTeachers() {
    const result = await pool.query(
        /*sql */
        `
        SELECT teachers.id, teachers.name, houses.name 
        AS house,
        teachers.employment_start, teachers.currently_active, teachers.deceased
        FROM teachers 
        JOIN houses 
        ON teachers.house_id = houses.id
        `
    );
    return result.rows;
}

export async function getTeacherByID(id) {
    const result = await pool.query(/*sql */`
        SELECT teachers.id, teachers.name, houses.name 
        AS house,
        teachers.employment_start, teachers.currently_active, teachers.deceased
        FROM teachers 
        FULL JOIN houses 
        ON teachers.house_id = houses.id
        WHERE teachers.id = $1`, [id]);

    if (result.rowCount === 0) {
        return null;
    }

    return result.rows[0];
}

export async function createTeacher(teacher) {
    const result = await pool.query(
        "insert into teachers (name, house_id, employment_start, currently_active, deceased) values ($1, $2, $3, $4, $5) returning *",
        [teacher.name, teacher.house_id, teacher.employment_start, teacher.currently_active, teacher.deceased]
    );
    return result.rows[0];
}


export async function updateTeacher(id, teacher) {
    const result = await pool.query(
        "update teachers set name = $1, house_id = $2, employment_start = $3, currently_active = $4, deceased = $5 where id = $6 returning *",
        [teacher.name, teacher.house_id, teacher.employment_start, teacher.currently_active, teacher.deceased, id]
    );

    if (result.rowCount === 0) return null;

    return getTeacherByID(result.rows[0].id);
}

export async function deleteTeacher(id) {
    const result = await pool.query("DELETE FROM teachers WHERE id = $1", [id]);

    return result.rowCount > 0;
}
