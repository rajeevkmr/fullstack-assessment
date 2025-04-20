const successResponse = (res, message, data = {}, statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

const errorResponse = (res, message, error = {}, statusCode = 500) => {
  res.status(statusCode).json({
    success: false,
    message,
    error,
  });
};

export { successResponse, errorResponse };
// This utility module provides functions to handle success and error responses in a consistent format.
// The `successResponse` function sends a success response with a message and optional data.
// The `errorResponse` function sends an error response with a message and optional error details.
// Both functions accept a response object, message, data/error details, and an optional status code.
// This helps in maintaining a uniform response structure across the application.
