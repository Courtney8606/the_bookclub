// File: passwdGenerate.js

// Following is adapted from MDN https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// The maximum is exclusive and the minimum is inclusive
function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); 
}

const passwdGenerate = ( maxPasswdLength, numberOfTestPasswds ) => {
    lowercase = "abcdefghijklmnopqrstuvwxyz";
    passwds = [];
    for( currentTestPasswdNumber = 0; currentTestPasswdNumber < numberOfTestPasswds; currentTestPasswdNumber++ ) {
        randomCharNumber = getRandomInt(0, lowercase.length);
        passwds.push(lowercase.charAt(randomCharNumber));
    }
    return passwds;
};

module.exports = passwdGenerate;
