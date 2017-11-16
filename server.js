const Hapi = require('hapi');
const Inert = require('inert');
const Geolocate = require('hapi-geo-locate');
const path = require('path');

const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: path.join(__dirname, 'assets')
      }
    }
  }
});

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

// register the inert plugin
server.register(Inert, () => {});

// register the geo-locate plugin
server.register({
  register: Geolocate,
  options: {
    enabled: true
  }
}, err => console.log(err));

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
server.route(require('./api/images/routes/get_image'));

// start the server and listen for errors just in case
server.start(err => {
  if (err) throw err;
  console.log(`Server listening on PORT ${server.info.uri}`);
});
