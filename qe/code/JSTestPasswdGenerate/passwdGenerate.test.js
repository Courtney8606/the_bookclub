// File: passwdGenerate.test.js

const passwdGenerate = require("./passwdGenerate");

describe('passwdGenerate', () => {
   it('generates a random single lowercase character for password length 1 and output number 1', () => {
       result = passwdGenerate( 1, 1 );
       expect(result.length).toBe(1);
       console.log("Actual output is ", result);
   });
});

