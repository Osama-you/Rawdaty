const connection = require('../../data/connection');

const getKindergartenQuery = () => {
  const sql = {
    text:
      'SELECT *, (SELECT AVG(comments.rating) AS rating_average FROM comments WHERE comments.kindergarten_id = kindergartens.id), (SELECT COUNT(comments) AS rating_count FROM comments WHERE comments.kindergarten_id = kindergartens.id) FROM kindergartens',
  };
  return connection.query(sql);
};

module.exports = getKindergartenQuery;
