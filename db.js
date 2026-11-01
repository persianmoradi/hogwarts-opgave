import "dotenv/config"; // gør det muligt at bruge .env filen
import pg from "pg"; // PostgreSQL driver
const { Pool } = pg;

const pool = new Pool({
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD
});

export default pool;