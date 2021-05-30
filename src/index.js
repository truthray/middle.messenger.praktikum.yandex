import './index.scss';

(function() {
    window.active = null
    window.changeActive = function(id) {
        if (active) {
            document.getElementById(active).classList.remove('chat-person--active')
        }
        active = id
        document.getElementById(id).classList.add('chat-person--active')

        document.getElementById('chat-area').classList.remove('hidden')
        document.getElementById('profile-area').classList.add('hidden')
    }

    window.switchToProfile = function(id) {
        changeActive(id)
        document.getElementById('profile-area').classList.remove('hidden')
        document.getElementById('chat-area').classList.add('hidden')
    }

    window.addPersonHandler = function() {
        const login = document.getElementById('Логин').value
        console.log('Добавить пользователя: ', login)
        document.getElementById('Логин').value = ''
    }

    window.removePersonHandler = function() {
        const login = document.getElementById('Логин').value
        console.log('Удалить пользователя: ', login)
        document.getElementById('Логин').value = ''
    }
})()