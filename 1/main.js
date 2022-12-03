"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSums = exports.processInput = void 0;
const fs = require('fs');
const path = require('path');
function processInput(filename) {
    const input = fs.readFileSync(path.resolve(__dirname, filename), 'utf8');
    const arrayOfStrings = input.split('\n');
    return arrayOfStrings;
}
exports.processInput = processInput;
function createSums(arrayOfStrings) {
    let sums = [0];
    let position = 0;
    for (let i = 0; i < arrayOfStrings.length; i++) {
        if (arrayOfStrings[i] !== '') {
            sums[position] += parseInt(arrayOfStrings[i]);
        }
        else {
            sums.push(0);
            position += 1;
        }
    }
    return sums;
}
exports.createSums = createSums;
const sums = createSums(processInput('puzzle.in'));
console.log('Highest Elf Calories: ', Math.max(...sums));
const topThree = sums.sort((a, b) => b - a).slice(0, 3);
let topThreeTotal = 0;
for (let i = 0; i < topThree.length; i++) {
    topThreeTotal += topThree[i];
}
console.log('Top Three Elf Calories: ', topThreeTotal);
