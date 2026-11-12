import { ZodError, prettifyError } from "zod";

export default (err, req, res, next) => {
  console.error(err.stack);

  // Ugyldigt input fra klienten (zod) er en 400, ikke en 500
  if (err instanceof ZodError) {
    err.statusCode = 400;
    err.message = prettifyError(err);
  }

  const statusCode = err.statusCode || 500;

  let error = err.error || "Internal Server Error";
  if (statusCode === 404) {
    error = "Not Found";
  } else if (statusCode === 400) {
    error = "Bad Request";
  }

  res.status(statusCode).json({
    message: err.message,
    error: error,
    statuskode: statusCode,
  });
};
