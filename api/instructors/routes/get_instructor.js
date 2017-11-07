'use strict';

const Boom = require('boom');
const instructorsData = require('../../../data');
const queries = require('../queries/instructor');
const { paramsValidator } = require('../schemas/get_instructor');

module.exports = {
  method: 'GET',
  path: '/api/instructors/{slug}',
  config: {
    pre: [
      { method: queries.getGithubImage, assign: 'image' }
    ],
    handler: (request, reply) => {
      // get the specified instructor
      const instructor = instructorsData.find(
        instructor => instructor.slug == request.params.slug
      );

      if (!instructor) {
        return reply(Boom.notFound('Instructor not found!'));
      };

      instructor.avatar = request.pre.image;

      // reply with the data
      reply({ data: instructor });
    },
    validate: {
      params: paramsValidator
    }
  }
};
