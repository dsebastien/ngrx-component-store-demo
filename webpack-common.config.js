"use strict";

const helpers = require("./helpers");

const tailwindWebpackRule = {
    test: /\.scss$/,
    loader: "postcss-loader",
    options: {
        ident: "postcss",
        syntax: "postcss-scss",
        plugins: () => [
            require("tailwindcss")(helpers.root("tailwind.config.js")), // We use the helper to ensure that the path is always relative to the workspace root
            require('autoprefixer'),
        ],
    },
};

exports.tailwindWebpackRule = tailwindWebpackRule;
