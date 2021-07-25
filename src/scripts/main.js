import chat from './chat';
import profile from './profile';

let loginField, chatArea, profileArea = null;
let login = '';
let personsBlocks = [];

const messages = [
    {self: true, avatar: 'https://upload.wikimedia.org/wikipedia/en/7/7c/Thom_Yorke_-_Tomorrow%27s_Modern_Boxes_album_artwork.jpg', text: 'Привет', time: '13:01', date: '23.05.2021'}, 
    {self: false, avatar: 'https://upload.wikimedia.org/wikipedia/en/7/7c/Thom_Yorke_-_Tomorrow%27s_Modern_Boxes_album_artwork.jpg', text: 'Хелоу!', time: '12:43', date: '24.05.2021'}
];
const profileData = { id: 1, login: 'videot4pe', email: 'videot4pe@gmail.com', display_name: 'videot4pe', phone: '89999999999', first_name: 'Alexandr', second_name: 'Kvasnikov', avatar: 'https://upload.wikimedia.org/wikipedia/en/7/7c/Thom_Yorke_-_Tomorrow%27s_Modern_Boxes_album_artwork.jpg' };
const personsData = [
    {id: 2, login: 'reckoner', unread: 2, avatar: 'https://upload.wikimedia.org/wikipedia/en/7/7c/Thom_Yorke_-_Tomorrow%27s_Modern_Boxes_album_artwork.jpg'}, 
    {id: 3, login: 'weirdfish', unread: 1, avatar: 'https://upload.wikimedia.org/wikipedia/en/7/7c/Thom_Yorke_-_Tomorrow%27s_Modern_Boxes_album_artwork.jpg'}, 
    {id: 4, login: 'decksdark', unread: 0, avatar: 'https://upload.wikimedia.org/wikipedia/en/7/7c/Thom_Yorke_-_Tomorrow%27s_Modern_Boxes_album_artwork.jpg'}, 
];
const ids = [profileData.id, ...personsData.map(x => x.id)]

window.onload = () => { 
    loginField = document.querySelector('#Логин');
    chatArea = document.querySelector('#chat-area');
    profileArea = document.querySelector('#profile-area');

    ids.forEach((id) => {
        personsBlocks.push(document.getElementById(`${id}`))
    })

    loginField.addEventListener('input', e => login = e.target.value);

    window.application.chatArea = chat;
    window.application.chatArea.init();

    window.application.profile = profile;
    window.application.profile.init();
};

window.onunload = () => {
    loginField.removeEventListener('input');
    window.application.chatArea.destroy();
}

let active = null;

export default {
    active,
    profileData,
    personsData,
    getMessages: (userId) => {
        return messages;
    },
    changeActive: function(id) {

        if (personsBlocks.length < id) {
            return;
        }

        if (active) {
            personsBlocks[active].classList.remove('chat-person--active')
        }

        active = id - 1
        personsBlocks[active].classList.add('chat-person--active')
    
        chatArea.classList.remove('hidden')
        profileArea.classList.add('hidden')
    },
    
    switchToProfile: function(id) {
        this.changeActive(id)
        profileArea.classList.remove('hidden')
        chatArea.classList.add('hidden')
    },

    addPersonHandler: function() {
        console.log('Добавить пользователя: ', login)
        loginField.value = ''
    },

    removePersonHandler: function() {
        console.log('Удалить пользователя: ', login)
        loginField.value = ''
    },
}