'use strict';

const Boom = require('boom');
const instructorsData = require('../../../data');
const sort = require('../../util/sort');
const { queryValidator } = require('../schemas/get_instructors');

module.exports = {
  method: 'GET',
  path: '/api/instructors/',
  config: {
    handler: (request, reply) => {

      if (!instructorsData) {
        return reply(Boom.notFound('No Instructors found!'));
      }

      // Let's get just the id, name, and slug when we make
      // a request for all instructors

      const trimmedData = instructorsData.map(
        instructor => {
          return {
            id: instructor.id,
            name: instructor.name,
            slug: instructor.slug
          }
        }
      );

      sort.sortData()

      const sortDirection = request.query.sortDirection;
      const sortKey = request.query.sortKey;

      // We can control the sorting key and direction
      // in a simple function that uses the sortBy function
      // from Lodash

      const data = sort.sortData(trimmedData, sortDirection, sortKey);

      // reply with the data
      reply({ data });
    },
    validate: {
      query: queryValidator
    }
  }
};
