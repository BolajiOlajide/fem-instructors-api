'use strict'

const Boom = require('boom');
const Wreck = require('wreck');
const instructorData = require('../../../data');

const checkEmail = (request, reply) => {
  const { email } = request.payload;
  const existingInstructor = instructorData.find(
    instructor => instructor.email == email
  )

  if (existingInstructor) {
    return reply(Boom.badRequest('Instructor exists!'));
  }
  return reply();
};

const createContactSlug = (request, reply) => {
  const { name } = request.payload;

  const slug = name.split(' ').join('-');

  reply(slug.toLowerCase());
};

const getGithubImage = (request, reply) => {
  const { slug } = request.params;
  const githubUsername = instructorData.find(
    instructor => instructor.slug == slug
  ).github;

  if (!githubUsername) return reply(Boom.badRequest('Error getting Github user!'));

  const options = {
    headers: { 'User-Agent': 'proton' },
    json: true
  };

  Wreck.get(
    `https://api.github.com/users/${githubUsername}`,
    options,
    (error, response, payload) => {
      if (error) return reply(Boom.badRequest('Something went wrong'));
      return reply(payload.avatar_url);
    }
  )
}

module.exports = {
  checkEmail,
  createContactSlug,
  getGithubImage
}
