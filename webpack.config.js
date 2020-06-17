"use strict";

const webpackCommonConfig = require("./webpack-common.config");

module.exports = {
    module: {
        rules: [
            webpackCommonConfig.tailwindWebpackRule,
        ],
    },
};
