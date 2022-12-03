"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processInput = void 0;
const fs = require('fs');
const path = require('path');
function processInput(filename) {
    const input = fs.readFileSync(path.resolve(__dirname, filename), 'utf8');
    const arrayOfStrings = input.split('\n');
    return arrayOfStrings;
}
exports.processInput = processInput;
