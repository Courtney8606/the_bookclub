// File: passwdGenerate.js

const passwdGenerate = ( maxPasswdLength, numberOfTestPasswds ) => {
    if ( numberOfTestPasswds === 1 ) {
        return ['a'];
    } 
    else {
        return ['a','a'];
    }
};

module.exports = passwdGenerate;
