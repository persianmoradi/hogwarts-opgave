import pool from "./db.js";

export async function getHouses() {
    const result = await pool.query("SELECT * FROM houses");
    return result.rows;
}

