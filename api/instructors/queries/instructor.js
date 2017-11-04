'use strict'

const Wreck = require('wreck');
const instructorData = require('../../../data');

const checkEmail = (request, reply) => {
  const { email } = request.payload;
  const existingInstructor = instructorData.find(
    instructor => instructor.email == email
  )

  if (existingInstructor) {
    return reply({ message: 'Instructor exists!' });
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

  if (!githubUsername) return reply();

  const options = {
    headers: { 'User-Agent': 'proton' },
    json: true
  };

  Wreck.get(
    `https://api.github.com/users/${githubUsername}`,
    options,
    (error, response, payload) => {
      console.log(response);
      console.log(' ');
      console.log(payload);
      reply(payload.data.avatar_url);
    }
  )
}

module.exports = {
  checkEmail,
  createContactSlug,
  getGithubImage
}
