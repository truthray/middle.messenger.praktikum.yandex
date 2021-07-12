let loginField, newPasswordField, oldPasswordField, emailField, firstNameField, secondNameField, phoneField, avatarInput = null;
let login, newPassword, oldPassword, email, firstName, secondName, phone = '';

export default {
    init: function() {
        loginField = document.querySelector('#Логин');
        newPasswordField = document.getElementById('Новый пароль');
        oldPasswordField = document.getElementById('Старый пароль');
        emailField = document.querySelector('#Почта');
        firstNameField = document.querySelector('#Имя');
        secondNameField = document.querySelector('#Фамилия');
        phoneField = document.querySelector('#Телефон');
        avatarInput = document.querySelector('#avatar_input')

        login = loginField.value;
        newPassword = newPasswordField.value;
        oldPassword = oldPasswordField.value;
        email = emailField.value;
        firstName = firstNameField.value;
        secondName = secondNameField.value;
        phone = phoneField.value;

        loginField.addEventListener('input', e => login = e.target.value);
        newPasswordField.addEventListener('input', e => newPassword = e.target.value);
        oldPasswordField.addEventListener('input', e => oldPassword = e.target.value);
        emailField.addEventListener('input', e => email = e.target.value);
        firstNameField.addEventListener('input', e => firstName = e.target.value);
        secondNameField.addEventListener('input', e => secondName = e.target.value);
        phoneField.addEventListener('input', e => phone = e.target.value);
    },
    destroy: function() {
        loginField.removeEventListener('input');
        newPasswordField.removeEventListener('input');
        oldPasswordField.removeEventListener('input');
        emailField.removeEventListener('input');
        firstNameField.removeEventListener('input');
        secondNameField.removeEventListener('input');
        phoneField.removeEventListener('input');
    },
    saveChanges: function() {
        console.log(`Почта: ${email}, Логин: ${login}, Имя: ${firstName}, Фамилия: ${secondName}, Телефон: ${phone}, Новый пароль: ${newPassword}, Старый пароль: ${oldPassword}`)
    },
    signOut: function() {
        window.location = '/signin.html'
    },
    onAvatarClick: function() {
        avatarInput.click()
    }
};