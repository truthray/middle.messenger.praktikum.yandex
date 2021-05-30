import './chat-area.scss';

(function() {
    window.currentDate = null
    window.sendMessageHandler = function() {
        const message = document.getElementById('message').value
        console.log('Сообщение: ', message)
        document.getElementById('message').value = ''
    }

    window.addFileClickHandler = function() {
        document.getElementById('file_input').click()
    }
})()