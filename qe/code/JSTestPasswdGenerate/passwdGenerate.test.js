// File: passwdGenerate.test.js

const passwdGenerate = require("./passwdGenerate");

describe('passwdGenerate', () => {
   it('generates a random single, single character password', () => {
       result = passwdGenerate( 1, 1 );
       expect(result.length).toBe(1);
       console.log("Actual output is ", result);
   });
   it('generates an arbitrary number of random, single character passwords', () => {
       result = passwdGenerate( 1, 50 );
        expect(result.length).toBe(50);
        console.log("Actual output is ", result);
    });
    it('generates a random single, two-character password', () => {
        result = passwdGenerate( 2, 1 );
        expect(result.length).toBe(1);
        console.log("Actual output is ", result);
    });
    it('generates an arbitrary number of random, two-character passwords', () => {
        result = passwdGenerate( 2, 50 );
        expect(result.length).toBe(50);
        console.log("Actual output is ", result);
    });  
});
