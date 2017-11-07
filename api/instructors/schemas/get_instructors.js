'use strict';

const Joi = require('joi');

const queryValidator = Joi.object({
  sortDirection: Joi.string().valid(['asc', 'desc']).required(),
  sortKey: Joi.string().valid(['id', 'name', 'slug']).required()
});

module.exports = { queryValidator };
