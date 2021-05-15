const dateQuery = require('./dateQuery.middleware');
const { getTheaters } = require('./theater.middleware');

module.exports = {
	dateQuery: dateQuery,
	getTheaters: getTheaters,
};
