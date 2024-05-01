// File: passwdGenerate.test.js

const passwdGenerate = require("./passwdGenerate");

describe('passwdGenerate', () => {
    it('generates a single lowercase character for password length 1 and output number 1', () => {
        result = passwdGenerate( 1, 1 );
        expect(result).toEqual(['a']);
        console.log("Actual output is ", result);
    });
    it('generates two lowercase characters for password length 1 and output number 2', () => {
        result = passwdGenerate( 1, 2 );
        expect(result).toEqual(['a', 'a']);
        console.log("Actual output is ", result);
    });
    it('generates five lowercase characters for password length 1 and output number 5', () => {
        result = passwdGenerate( 1, 5 );
        expect(result).toEqual(['a', 'a', 'a', 'a', 'a']);
        console.log("Actual output is ", result);
    });
});

