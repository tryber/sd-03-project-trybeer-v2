const generateError = (status, error) => ({
  status,
  payload: { message: error.message },
});

module.exports = {
  generateError,
};
