// File: passwdGenerate.test.js

const isPasswordValid = require("./isPasswordValid");
const passwdGenerate = require("./passwdGenerate");

describe('passwdGenerate', () => {
    it('has a blank test only for now', () => {
        result = passwdGenerate(30, 1000);
        console.log("Actual output is: ", result);
    });
});

describe('isPasswordValid', () => {
    it('has a blank test only for now', () => {
        result = isPasswordValid("");
        console.log("Actual output is: ", result);
    });  
});
