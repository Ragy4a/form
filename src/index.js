'use strict';

const firstNameInput = document.getElementById('first-name');
const lastNameInput = document.getElementById('last-name');
const password = document.getElementById('password');
const displayNameInput = document.getElementById('display-name');
const emailInput = document.getElementById('email');
const passwordConfirmationInput = document.getElementById('password-confirmation');
const errorInformation = document.querySelector('.error-window > p')
const okButton = document.getElementById('ok-button');
const cancelButton = document.getElementById('cancel-button')

class Person {
    constructor (fName, lName, dName, email) {
        this.fName = fName;
        this.lName = lName;
        this.dName = dName;
        this.email = email;
    }
}

function getInformation (event) {
    try {
        const fName = firstNameInput.value;
        const lName = lastNameInput.value;
        const dName = displayNameInput.value;
        const email = emailInput.value;
        const User = new Person(fName, lName, dName, email)
        if (fName === '' || lName === '' || dName === '' || email === '') {
            throw new Error('Wrong information.');
        } 
        localStorage.setItem(lName, JSON.stringify(User))
    } catch (error) {
        errorInformation.textContent = `${error}`
    }
}

okButton.addEventListener('click', getInformation)
cancelButton.addEventListener('click', () => document.querySelector('form').reset())
