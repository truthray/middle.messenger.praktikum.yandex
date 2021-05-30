import './signin.scss';

(function () {
    window.signIn = function() {
        const login = document.getElementById('Логин').value
        const password = document.getElementById('Пароль').value
        console.log(`Логин: ${login}, пароль: ${password}`)
        
        window.location = '/'
    }

    window.redirectToSignUp = function() {
        window.location = '/signup.html'
    }
})()