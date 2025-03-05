// write error handling middleware that will log the error to the console and send a 500 status code

const errorHandler = (err, req, res, next) => {
  console.error(err);
  const statusCode = err.statusCode ?? 500;
  return res.status(statusCode ?? 500).json({
    error: statusCode,
    message: err.message,
  });
};

module.exports = errorHandler;
