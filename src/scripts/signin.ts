let loginField: HTMLInputElement | null;
let passwordField: HTMLInputElement | null;
let login = '';
let password = '';

const loginHandler = (e: Event) => {
	const target = e.target as HTMLInputElement;
	if (target) {
		login = target.value;
	}
};

const passwordHandler = (e: Event) => {
	const target = e.target as HTMLInputElement;
	if (target) {
		password = target.value;
	}
};

window.onload = () => {
	loginField = document.querySelector('#Логин');
	passwordField = document.querySelector('#Пароль');

	if (loginField) {
		login = loginField.value;
	}

	if (passwordField) {
		password = passwordField.value;
	}

	loginField?.addEventListener('input', loginHandler);
	passwordField?.addEventListener('input', passwordHandler);
};

window.onunload = () => {
	loginField?.removeEventListener('input', loginHandler);
	passwordField?.removeEventListener('input', passwordHandler);
};

export default {
	signIn() {
		console.log(`Логин: ${login}, пароль: ${password}`);
		window.location.href = '/index.html';
	},
	redirectToSignUp() {
		window.location.href = '/signup.html';
	},
};
