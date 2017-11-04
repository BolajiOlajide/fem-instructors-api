'use strict';

const instructorsData = require('../../../data');
const queries = require('../queries/instructor');

module.exports = {
  method: 'GET',
  path: '/api/instructors/{slug}',
  config: {
    // pre: [
    //   { method: queries.getGithubImage, assign: 'avatar' }
    // ],
    handler: (request, reply) => {
      // get the specified instructor
      const instructor = instructorsData.find(
        instructor => instructor.slug == request.params.slug
      );
      
      if (!instructor) {
        reply({ status: 404, message: 'Instructor not found!' });
        return;
      };

      instructor.avatar = request.pre.image;
      
      // reply with the data
      reply({ data: instructor });
    }
  }
};
