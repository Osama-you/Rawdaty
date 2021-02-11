const { addCommentsQuery } = require('./comments');
const {
  getKindergartenQuery,
  getKindergartenById,
  getKindergartenId,
} = require('./kindergarten');
const { getUsersQuery } = require('./users');
const { getLocationsQuery } = require('./locations');

module.exports = {
  getKindergartenQuery,
  getKindergartenById,
  addCommentsQuery,
  getKindergartenId,
  getUsersQuery,
  getLocationsQuery,
};
