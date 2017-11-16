'use strict';

module.exports = {
  method: 'GET',
  path: '/api/images/{name}',
  config: {
    handler: (request, reply) => {
      const { name } = request.params;

      console.log(request.location)

      reply.file(name);
    }
  }
}
