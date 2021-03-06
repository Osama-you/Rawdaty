const connection = require('../../data/connection');

const getKindergartenSearch = ({ q, minPrice, maxPrice, locationId }) => {
  let text =
    'SELECT kindergartens.id, kindergartens.kindergarten_name, kindergartens.cover_image, kindergartens.min_price, kindergartens.max_price, locations.location_sub, locations.location_main, rating.rating_count, rating.rating_average ' +
    'FROM kindergartens ' +
    'INNER JOIN locations ON locations.id = kindergartens.location_id ' +
    'LEFT JOIN ' +
    '(select COUNT(rating) AS rating_count, AVG(rating) AS rating_average, kindergarten_id FROM comments GROUP BY kindergarten_id ) ' +
    'AS rating ON rating.kindergarten_id = kindergartens.id ' +
    "WHERE kindergartens.request_status = 'approved' AND kindergartens.is_enable = 'true'  AND ";
  const values = [];

  if (q) {
    text += `kindergarten_name like TRIM($${values.length + 1}) AND `;
    values.push(`%${q}%`);
  }

  if (minPrice && maxPrice) {
    text += `( max_price >= $${values.length + 1} AND max_price <= $${
      values.length + 2
    }) AND `;
    values.push(minPrice);
    values.push(maxPrice);
  }

  if (locationId) {
    text += `location_id = (SELECT id FROM locations WHERE id = $${
      values.length + 1
    }) AND `;
    values.push(locationId);
  }

  return connection.query({
    text: text.slice(0, -4),
    values,
  });
};

module.exports = getKindergartenSearch;
