import pool from "../db.js";

export async function getTeachers() {
    const result = await pool.query(
        /*sql */
        `
        SELECT teachers.id, teachers.name, houses.name 
        AS house
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
        AS house
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
        "INSERT INTO teachers (name, house_id) VALUES ($1, $2) RETURNING *",
        [teacher.name, teacher.house_id]
    );
    return result.rows[0];
}


export async function updateTeacher(id, name, house_id) {
    console.log (house_id)
    const result = await pool.query(
        "UPDATE teachers SET name = $1, house_id = $2 WHERE id = $3 RETURNING *",
        [name, house_id, id]
    );

    if (result.rowCount === 0) return null;

    return getTeacherByID(result.rows[0].id);
}

export async function deleteTeacher(id) {
    const result = await pool.query("DELETE FROM teachers WHERE id = $1", [id]);

    return result.rowCount > 0;
}
