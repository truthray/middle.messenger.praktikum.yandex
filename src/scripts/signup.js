let loginField, passwordField, emailField, firstNameField, secondNameField, phoneField = null;
let login, password, email, firstName, secondName, phone = '';

window.onload = () => { 
    loginField = document.querySelector('#Логин');
    passwordField = document.querySelector('#Пароль');
    emailField = document.querySelector('#Почта');
    firstNameField = document.querySelector('#Имя');
    secondNameField = document.querySelector('#Фамилия');
    phoneField = document.querySelector('#Телефон');

    login = loginField.value;
    password = passwordField.value;
    email = emailField.value;
    firstName = firstNameField.value;
    secondName = secondNameField.value;
    phone = phoneField.value;

    loginField.addEventListener('input', e => login = e.target.value);
    passwordField.addEventListener('input', e => password = e.target.value);
    emailField.addEventListener('input', e => email = e.target.value);
    firstNameField.addEventListener('input', e => firstName = e.target.value);
    secondNameField.addEventListener('input', e => secondName = e.target.value);
    phoneField.addEventListener('input', e => phone = e.target.value);
};

window.onunload = () => {
    loginField.removeEventListener('input');
    passwordField.removeEventListener('input');
    emailField.removeEventListener('input');
    firstNameField.removeEventListener('input');
    secondNameField.removeEventListener('input');
    phoneField.removeEventListener('input');
}


export default {
    signUp: function() {
        console.log(`Логин: ${login}, пароль: ${password}, почта: ${email}, имя: ${firstName}, фамилия: ${secondName}, телефон: ${phone}`)
        window.location = '/index.html'
    },
    redirectToSignIn: function() {
        window.location = '/signin.html'
    }
}