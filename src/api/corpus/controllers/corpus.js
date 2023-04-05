'use strict';

/**
 * corpus controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::corpus.corpus');
