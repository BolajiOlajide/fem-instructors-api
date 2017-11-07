const Hapi = require('hapi');
const server = new Hapi.Server();

// We need to specify a connection, which
// we can default to the port specified in
// an ENV variable, or 3001 if none is set.
// We also need to configure CORS for requests
// coming from a single page app
server.connection({
  port: process.env.port || 3001,
  routes: {
    cors: {
      origin: ['*']
    }
  }
});

// create a route
server.route({
  method: 'GET',
  path: '/api',
  handler: (request, reply) => {
    reply({ message: 'I am alive' });
  }
});

server.route(require('./api/instructors/routes/get_instructors'));
server.route(require('./api/instructors/routes/get_instructor'));
server.route(require('./api/instructors/routes/create_instructor'));

// start the server and listen for errors just in case
server.start(err => {
  if (err) throw err;
  console.log(`Server listening on PORT ${server.info.uri}`);
});
