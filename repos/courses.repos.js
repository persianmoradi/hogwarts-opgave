import pool from "../db.js";

export async function getCourses() {
    const result = await pool.query("SELECT * FROM courses");

    return result.rows;
}

export async function getCourseByID(id) {
    const result = await pool.query(
        "SELECT courses.id, courses.name, courses.teacher_id, teachers.name AS teacher_name " +
        "FROM courses LEFT JOIN teachers ON courses.teacher_id = teachers.id " +
        "WHERE courses.id = $1",
        [id]
    );

    if (result.rowCount === 0) {
        return null;
    }

    return result.rows[0];
}

export async function createCourse(name, teacher_id) {
    const result = await pool.query(
        "INSERT INTO courses (name, teacher_id) VALUES ($1, $2) RETURNING *",
        [name, teacher_id]
    );

    return result.rows[0];
}

export async function updateCourse(id, name) {
    const result = await pool.query(
        "UPDATE courses SET name = $1 WHERE id = $2 RETURNING *",
        [name, id]
    );

    if (result.rowCount === 0) {
        return null;
    }

    return result.rows[0];
}

export async function deleteCourse(id) {
    const result = await pool.query("DELETE FROM courses WHERE id = $1", [id]);

    return result.rowCount > 0;
}


// --------------------- STUDENTS PÅ ET COURSE (koblingstabellen course_students) ---------------------

export async function getStudentsInCourse(course_id) {
    const result = await pool.query(
        "SELECT students.id, students.name " +
        "FROM course_students JOIN students ON course_students.student_id = students.id " +
        "WHERE course_students.course_id = $1",
        [course_id]
    );

    return result.rows;
}
