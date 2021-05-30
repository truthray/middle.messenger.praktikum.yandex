import './profile.scss';

(function() {
    window.saveChanges = function() {
        const email = document.getElementById('Почта').value
        const login = document.getElementById('Логин').value
        const first_name = document.getElementById('Имя').value
        const second_name = document.getElementById('Фамилия').value
        const phone = document.getElementById('Телефон').value
        const new_password = document.getElementById('Новый пароль').value
        const old_password = document.getElementById('Старый пароль').value
        console.log(`Почта: ${email}, Логин: ${login}, Имя: ${first_name}, Фамилия: ${second_name}, Телефон: ${phone}, Новый пароль: ${new_password}, Старый пароль: ${old_password}`)
    }

    window.signOut = function() {
        window.location = '/signin.html'
    }

    window.onAvatarClick = function() {
        document.getElementById('avatar_input').click()
    }
})()