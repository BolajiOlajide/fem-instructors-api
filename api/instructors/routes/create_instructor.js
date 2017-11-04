'use strict';

const query = require('../queries/instructor');

const instructorsData = require('../../../data');

module.exports = {
  method: 'POST',
  path: '/api/instructors',
  config: {
    pre: [
      { method: query.checkEmail },
      { method: query.createContactSlug, assign: 'slug' }
    ],
    handler: (request, reply) => {
      console.log(request.pre.slug);
      // create the instructor object to be saved to the database
      const data = {
        id: instructorsData.length + 1,
        name: request.payload.name,
        slug: request.pre.slug,
        email: request.payload.email,
        twitter: request.payload.twitter,
        github: request.payload.github,
        courses: request.payload.courses
      }

      instructorsData.push(data);
      reply({ data });
    }
  }
};
