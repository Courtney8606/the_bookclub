// File: passwdGenerate.test.js

const passwdGenerate = require("./passwdGenerate");

describe('passwdGenerate', () => {
    it('generates a single lowercase character for password length 1 and output number 1', () => {
        result = passwdGenerate( 1, 1 );
        expect(result).toEqual(expect.arrayContaining(['a']));
    });
    it('generates two lowercase characters for password length 1 and output number 2', () => {
        result = passwdGenerate( 1, 2 );
        expect(result).toEqual(expect.arrayContaining(['a']));
    });
});

