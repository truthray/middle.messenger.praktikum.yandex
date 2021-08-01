/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import chat from './chat';
import profile from './profile';

let loginField: HTMLInputElement | null;
let chatArea: HTMLElement | null;
let profileArea: HTMLElement | null;
let login = '';
const personsBlocks: HTMLElement[] = [];

const messages = [
	{self: true, avatar: 'https://upload.wikimedia.org/wikipedia/en/7/7c/Thom_Yorke_-_Tomorrow%27s_Modern_Boxes_album_artwork.jpg', text: 'Привет', time: '13:01', date: '23.05.2021'},
	{self: false, avatar: 'https://upload.wikimedia.org/wikipedia/en/7/7c/Thom_Yorke_-_Tomorrow%27s_Modern_Boxes_album_artwork.jpg', text: 'Хелоу!', time: '12:43', date: '24.05.2021'},
];
const profileData = {id: 1, login: 'videot4pe', email: 'videot4pe@gmail.com', display_name: 'videot4pe', phone: '89999999999', first_name: 'Alexandr', second_name: 'Kvasnikov', avatar: 'https://upload.wikimedia.org/wikipedia/en/7/7c/Thom_Yorke_-_Tomorrow%27s_Modern_Boxes_album_artwork.jpg'};
const personsData = [
	{id: 2, login: 'reckoner', unread: 2, avatar: 'https://upload.wikimedia.org/wikipedia/en/7/7c/Thom_Yorke_-_Tomorrow%27s_Modern_Boxes_album_artwork.jpg'},
	{id: 3, login: 'weirdfish', unread: 1, avatar: 'https://upload.wikimedia.org/wikipedia/en/7/7c/Thom_Yorke_-_Tomorrow%27s_Modern_Boxes_album_artwork.jpg'},
	{id: 4, login: 'decksdark', unread: 0, avatar: 'https://upload.wikimedia.org/wikipedia/en/7/7c/Thom_Yorke_-_Tomorrow%27s_Modern_Boxes_album_artwork.jpg'},
];
const ids = [profileData.id, ...personsData.map(x => x.id)];

const loginHandler = (e: Event) => {
	const target = e.target as HTMLInputElement;
	if (target) {
		login = target.value;
	}
};

window.onload = () => {
	loginField = document.querySelector('#Логин');
	chatArea = document.querySelector('#chat-area');
	profileArea = document.querySelector('#profile-area');

	ids.forEach(id => {
		const element = document.getElementById(`${id}`);
		if (element) {
			personsBlocks.push(element);
		}
	});

	loginField?.addEventListener('input', loginHandler);

	window.application.chatArea = chat;
	window.application.chatArea.init();

	window.application.profile = profile;
	window.application.profile.init();
};

window.onunload = () => {
	loginField?.removeEventListener('input', loginHandler);
	window.application.chatArea.destroy();
};

let active: number | null = null;

export default {
	active,
	profileData,
	personsData,
	getMessages: () => messages,
	changeActive(id: number) {
		if (personsBlocks.length < id) {
			return;
		}

		if (active) {
			personsBlocks[active].classList.remove('chat-person--active');
		}

		active = id - 1;
		personsBlocks[active].classList.add('chat-person--active');

		chatArea?.classList.remove('hidden');
		profileArea?.classList.add('hidden');
	},

	switchToProfile(id: number) {
		this.changeActive(id);
		profileArea?.classList.remove('hidden');
		chatArea?.classList.add('hidden');
	},

	addPersonHandler() {
		console.log('Добавить пользователя: ', login);
		if (loginField) {
			loginField.value = '';
		}
	},

	removePersonHandler() {
		console.log('Удалить пользователя: ', login);
		if (loginField) {
			loginField.value = '';
		}
	},
};
