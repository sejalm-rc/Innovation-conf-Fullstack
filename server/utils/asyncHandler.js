// Wraps an async route handler and forwards rejected promises to Express's
// error-handling middleware, so controllers don't need repetitive try/catch.
function asyncHandler(fn) {
  return function wrapped(req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

module.exports = asyncHandler;
