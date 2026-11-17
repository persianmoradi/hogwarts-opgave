import pool from "../db.js";

export async function getStudents() {
    const result = await pool.query("SELECT * FROM students");

    return result.rows;
}

export async function getStudentByID(id) {
    const result = await pool.query("SELECT * FROM students WHERE id = $1", [id]);

    if (result.rowCount === 0) {
        return null;
    }

    return result.rows[0];
}

export async function createStudent(student) {
    const result = await pool.query(
        "insert into students (name, birthday, school_year, house_id) values ($1, $2, $3, $4) returning *",
        [student.name, student.birthday, student.school_year, student.house_id]
    );

    return result.rows[0];
}

export async function updateStudent(id, student) {
    const result = await pool.query(
        "update students set name = $1, birthday = $2, school_year = $3, house_id = $4 where id = $5 returning *",
        [student.name, student.birthday, student.school_year, student.house_id, id]
    );

    if (result.rowCount === 0) {
        return null;
    }

    return result.rows[0];
}

export async function deleteStudent(id) {
    const result = await pool.query("DELETE FROM students WHERE id = $1", [id]);

    return result.rowCount > 0;
}
