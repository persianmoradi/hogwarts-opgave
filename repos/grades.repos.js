import pool from "../db.js";

export async function getGrades() {
    const result = await pool.query("select * from grades order by letter");
    return result.rows;
}

export async function getGradeByLetter(letter) {
    const result = await pool.query("select * from grades where letter = $1", [letter]);

    if (result.rowCount === 0) {
        return null;
    }

    return result.rows[0];
}
