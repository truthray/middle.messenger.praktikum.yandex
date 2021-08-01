import {ChatArea} from './../common/types';
let messageField: HTMLInputElement | null;
let fileInput: HTMLElement | null;
let message = '';

const currentDate = null;

function fieldMessage(e: Event) {
	const target = e.target as HTMLInputElement;
	message = target.value || '';
}

const chat: ChatArea = {
	currentDate,
	init() {
		messageField = document.querySelector('#message');
		fileInput = document.querySelector('#file_input');
		messageField?.addEventListener('input', fieldMessage);
	},
	destroy() {
		messageField?.removeEventListener('input', fieldMessage);
	},
	sendMessageHandler() {
		console.log('Сообщение: ', message);
		if (messageField) {
			messageField.value = '';
		}
	},
	addFileClickHandler() {
		fileInput?.click();
	},
};

export default chat;
