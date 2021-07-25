let messageField, fileInput = null;
let message = '';

const currentDate = null;
export default {
    currentDate,
    init: function() {
        messageField = document.querySelector('#message');
        fileInput = document.querySelector('#file_input');
        messageField.addEventListener('input', e => message = e.target.value);
    },
    destroy: function() {
        messageField.removeEventListener('input');
    },
    sendMessageHandler: function() {
        // console.log(message, messageField)
        console.log('Сообщение: ', message)
        messageField.value = ''
    },
    addFileClickHandler: function() {
        fileInput.click()
    },    
};