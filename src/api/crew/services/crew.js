'use strict';

/**
 * crew service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::crew.crew');
