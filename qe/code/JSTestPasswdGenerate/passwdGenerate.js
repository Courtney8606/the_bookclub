// File: passwdGenerate.js

const passwdGenerate = ( maxPasswdLength, numberOfTestPasswds ) => {
    passwds = [];
    for( currentTestPasswdNumber = 0; currentTestPasswdNumber < numberOfTestPasswds; currentTestPasswdNumber++ ) {
        passwds.push('a');
    }
    return passwds;
};

module.exports = passwdGenerate;
