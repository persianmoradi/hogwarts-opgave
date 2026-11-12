//  HOGWARTS COURSE MANAGEMENT SYSTEM 
// -------------------------------------

// Routes Import
import express from "express";
import teachersRouter from "./routes/teachers.routes.js";
import housesRouter from "./routes/houses.routes.js";
import studentsRouter from "./routes/students.routes.js";
import coursesRouter from "./routes/courses.routes.js";
import errorhandler from "./errorhandling/errorhandler.js";

// Server Setup
const app = express();

// Hvilken port vores localhost kører på
const port = 3000;

// Gør at vi kan læse JSON i req.body (POST og PUT)
app.use(express.json()); 


//  HOUSES: (read only)
app.use(housesRouter);


//  TEACHERS: (fuld CRUD)
app.use(teachersRouter);


//  STUDENTS: (fuld CRUD)
app.use(studentsRouter);


//  COURSES: (CRUD + skift af teacher)
app.use(coursesRouter);

// Error Handling Middleware
app.use(errorhandler);

//  Server Start
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


