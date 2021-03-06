const getKindergartenQuery = require('./getKindergartenQuery');
const getKindergartenById = require('./getKindergartenById');
const getKindergartenId = require('./getKindergartenId');
const getKindergartenSearch = require('./getKindergartenSearch');
const addKindergartenQuery = require('./addKindergartenQuery');
const deleteKindergartenQuery = require('./deleteKindergarten');
const getKindergartensByUserId = require('./getKindergartensByUserId');

module.exports = {
  deleteKindergartenQuery,
  getKindergartenQuery,
  addKindergartenQuery,
  getKindergartenById,
  getKindergartenId,
  getKindergartenSearch,
  getKindergartensByUserId,
};
