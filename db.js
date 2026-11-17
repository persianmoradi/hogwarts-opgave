import "dotenv/config";
import pg from "pg";
const { Pool } = pg;

// date-kolonner returneres som "YYYY-MM-DD" i stedet for et Date-objekt
pg.types.setTypeParser(1082, (value) => value);

const pool = new Pool({
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD
});

export default pool;