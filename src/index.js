'use strict';

const errorInformation = document.querySelector('.error-window > p');
const passwordError = document.querySelector('.error-window > p:last-child');
let hasErrors = false;

class Person {
    constructor(fName, lName, dName, email) {
        this.fName = fName;
        this.lName = lName;
        this.dName = dName;
        this.email = email;
    }
}

function checkPassword() {
    try {
        const passwordPattern = /^[^&.,%$#@!*]+$/;
        const password = document.getElementById('password').value;
        const passwordConfirmation = document.getElementById('password-confirmation').value;
        if (password.length < 8 || password.length > 20 || passwordConfirmation.length < 8 || passwordConfirmation.length > 20) {
            throw new Error('Password must be between 8 and 20 characters long.');
        }
        if (!passwordPattern.test(password) || !passwordPattern.test(passwordConfirmation)) {
            throw new Error('Password contains invalid characters.');
        }
        if (password !== passwordConfirmation) {
            throw new Error('Passwords do not match.');
        }
        passwordError.textContent = '';
        hasErrors = false; 
    } catch (error) {
        passwordError.textContent = error.message;
        hasErrors = true; 
    }
}

function validateEmail() {
    try {
        const email = document.getElementById('email').value;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            throw new Error('Email is not correct.');
        }
        errorInformation.textContent = '';
        hasErrors = false;
    } catch (error) {
        errorInformation.textContent = error.message;
        hasErrors = true;
    }
}

function getInformation(event) {
    event.preventDefault();
    if (hasErrors) {
        return;
    }
    try {
        const fName = document.getElementById('first-name').value;
        const lName = document.getElementById('last-name').value;
        const dName = document.getElementById('display-name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const passwordConfirmation = document.getElementById('password-confirmation').value;

        if (fName === '' || lName === '' || dName === '' || email === '' || password === '' || passwordConfirmation === '') {
            throw new Error('Please fill in all fields.');
        }
        const User = new Person(fName, lName, dName, email);
        localStorage.setItem(lName, JSON.stringify(User));
        errorInformation.textContent = '';
    } catch (error) {
        errorInformation.textContent = error.message;
    }
}

document.getElementById('password').addEventListener('change', checkPassword);
document.getElementById('password-confirmation').addEventListener('change', checkPassword);
document.getElementById('email').addEventListener('change', validateEmail);
document.getElementById('ok-button').addEventListener('click', getInformation);
