"use strict";

/**
 * corpus router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::corpus.corpus");
