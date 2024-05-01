// File: passwdGenerate.test.js

const passwdGenerate = require("./passwdGenerate");

describe('passwdGenerate', () => {
    it('generates a single lowercase character for password length 1 and output length 1', () => {
        const expected = ['a'];
        result = passwdGenerate( 1, 1 );
        expect(result).toEqual(expect.arrayContaining(['a']));
    });
});

