import './signup.scss';

(function() {
    window.signUp = function() {
        const login = document.getElementById('Логин').value
        const email = document.getElementById('Почта').value
        const first_name = document.getElementById('Имя').value
        const second_name = document.getElementById('Фамилия').value
        const phone = document.getElementById('Телефон').value
        const password = document.getElementById('Пароль').value

        console.log(`Логин: ${login}, пароль: ${password}, почта: ${email}, имя: ${first_name}, фамилия: ${second_name}, телефон: ${phone}`)

        window.location = '/'
    }

    window.redirectToSignIn = function() {
        window.location = '/signin.html'
    }
})()