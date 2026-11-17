import pool from "../db.js";

const selectExam = /*sql */`
    select exams.id, exams.course_id, courses.name as course,
           exams.student_id, students.name as student, exams.grade
    from exams
    join courses on exams.course_id = courses.id
    join students on exams.student_id = students.id
`;

export async function getExams() {
    const result = await pool.query(selectExam + " order by exams.id");
    return result.rows;
}

export async function getExamByID(id) {
    const result = await pool.query(selectExam + " where exams.id = $1", [id]);

    if (result.rowCount === 0) {
        return null;
    }

    return result.rows[0];
}

export async function createExam(exam) {
    const result = await pool.query(
        "insert into exams (course_id, student_id, grade) values ($1, $2, $3) returning id",
        [exam.course_id, exam.student_id, exam.grade]
    );

    return getExamByID(result.rows[0].id);
}

export async function updateExam(id, exam) {
    const result = await pool.query(
        "update exams set grade = $1 where id = $2 returning id",
        [exam.grade, id]
    );

    if (result.rowCount === 0) {
        return null;
    }

    return getExamByID(id);
}

export async function deleteExam(id) {
    const result = await pool.query("delete from exams where id = $1", [id]);

    return result.rowCount > 0;
}
