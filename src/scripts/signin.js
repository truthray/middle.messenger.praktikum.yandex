let loginField, passwordField = null;
let login, password = '';

window.onload = () => { 
    loginField = document.querySelector('#Логин');
    passwordField = document.querySelector('#Пароль');

    login = loginField.value;
    password = passwordField.value;

    loginField.addEventListener('input', e => login = e.target.value);
    passwordField.addEventListener('input', e => password = e.target.value);
};

window.onunload = () => {
    loginField.removeEventListener('input');
    passwordField.removeEventListener('input');
}

export default {
    signIn: function() {
        console.log(`Логин: ${login}, пароль: ${password}`)
        window.location = '/index.html'
    },
    redirectToSignUp: function() {
        window.location = '/signup.html'
    }
}