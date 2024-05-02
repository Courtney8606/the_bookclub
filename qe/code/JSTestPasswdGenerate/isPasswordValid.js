// File isPasswordValid.js
// Code from developer team, Mustafa Yahya

const special = /[!@#$%^&*(),.?":{}|<>]/;
const caps = /[A-Z]/;
const number = /[0-9]/;

const isPasswordValid = (password) => {
    return (
      password.length > 12 &&
      special.test(password) &&
      caps.test(password) &&
      number.test(password)
    );
};

module.exports = isPasswordValid;

