'use strict'

const sortBy = require('lodash').sortBy;

const sortData = (data, direction, key) => {
  if (direction === 'asc') {
    return sortBy(data, key);
  } else if (direction === 'desc') {
    return sortBy(data, key).reverse();
  } else {
    return data;
  }
};

module.exports = { sortData };
