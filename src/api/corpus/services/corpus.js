'use strict';

/**
 * corpus service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::corpus.corpus');
