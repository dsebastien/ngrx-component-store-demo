"use strict";

const path = require("path");
const _root = path.resolve(process.cwd(), "."); // project root folder
const root = path.join.bind(path, _root);

exports.root = root;
