const { DateTime } = require('luxon');

const createFormattedDate = () => DateTime.local().toFormat('yyyy-LL-dd hh:mm:ss');

module.exports = { createFormattedDate };
