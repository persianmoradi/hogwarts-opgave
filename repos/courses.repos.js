import pool from "../db.js";

export async function getCourses() {
    const result = await pool.query("SELECT * FROM courses");

    return result.rows;
}

export async function getCourseByID(id) {
    const result = await pool.query(
        "SELECT courses.id, courses.name, courses.teacher_id, teachers.name AS teacher_name, " +
        "courses.type, courses.level, courses.school_year " +
        "FROM courses LEFT JOIN teachers ON courses.teacher_id = teachers.id " +
        "WHERE courses.id = $1",
        [id]
    );

    if (result.rowCount === 0) {
        return null;
    }

    return result.rows[0];
}

export async function createCourse(course) {
    const result = await pool.query(
        "insert into courses (name, teacher_id, type, level, school_year) values ($1, $2, $3, $4, $5) returning *",
        [course.name, course.teacher_id, course.type, course.level, course.school_year]
    );

    return result.rows[0];
}

export async function updateCourse(id, course) {
    const result = await pool.query(
        "update courses set name = $1, type = $2, level = $3, school_year = $4 where id = $5 returning *",
        [course.name, course.type, course.level, course.school_year, id]
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
