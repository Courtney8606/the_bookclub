// File: passwdGenerate.js

const isPasswordValid = require('./isPasswordValid');

// Following is adapted from MDN https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// The maximum is exclusive and the minimum is inclusive
function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); 
}

const passwdGenerate = ( maxPasswdLength, numberOfTestPasswds ) => {
    lowercase = "abcdefghijklmnopqrstuvwxyz";
    uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    numbers = "0123456789";
    specials = "!@£#$%^&*()-_=+[]{};:'\"\\|`~,<.>/?"
    possibleChars = lowercase.concat(uppercase).concat(numbers).concat(specials);
    passwds = [];
    for( currentTestPasswdNumber = 0; currentTestPasswdNumber < numberOfTestPasswds; currentTestPasswdNumber++ ) {
        currentPasswd = "";
        randomLength = getRandomInt(0, maxPasswdLength);
        for( currentCharNumber = 0; currentCharNumber < randomLength; currentCharNumber++ ) {
            randomCharNumber = getRandomInt(0, possibleChars.length);
            currentPasswd = currentPasswd.concat( possibleChars.charAt(randomCharNumber) );
        }
        passwds.push(currentPasswd);
    }
    return passwds;
};

console.log("Is password abcdefghijklmnop valid? ", isPasswordValid( "abcdefghijklmnop" ));
console.log("Is password Ab1:cdefghij valid?", isPasswordValid("Ab1:cdefghij"));
console.log("Is password Ab1:cdefghijk valid?", isPasswordValid("Ab1:cdefghijk"));

module.exports = passwdGenerate;
