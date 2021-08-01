let loginField: HTMLInputElement | null;
let passwordField: HTMLInputElement | null;
let emailField: HTMLInputElement | null;
let firstNameField: HTMLInputElement | null;
let secondNameField: HTMLInputElement | null;
let phoneField: HTMLInputElement | null;
let login = '';
let password = '';
let email = '';
let firstName = '';
let secondName = '';
let phone = '';

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

const emailHandler = (e: Event) => {
	const target = e.target as HTMLInputElement;
	if (target) {
		email = target.value;
	}
};

const firstNameHandler = (e: Event) => {
	const target = e.target as HTMLInputElement;
	if (target) {
		firstName = target.value;
	}
};

const secondNameHandler = (e: Event) => {
	const target = e.target as HTMLInputElement;
	if (target) {
		secondName = target.value;
	}
};

const phoneHandler = (e: Event) => {
	const target = e.target as HTMLInputElement;
	if (target) {
		phone = target.value;
	}
};

window.onload = () => {
	loginField = document.querySelector('#Логин');
	passwordField = document.querySelector('#Пароль');
	emailField = document.querySelector('#Почта');
	firstNameField = document.querySelector('#Имя');
	secondNameField = document.querySelector('#Фамилия');
	phoneField = document.querySelector('#Телефон');

	if (!(loginField && passwordField && emailField && firstNameField && secondNameField && phoneField)) {
		throw new Error();
	}

	login = loginField.value;
	password = passwordField.value;
	email = emailField.value;
	firstName = firstNameField.value;
	secondName = secondNameField.value;
	phone = phoneField.value;

	loginField.addEventListener('input', loginHandler);
	passwordField.addEventListener('input', passwordHandler);
	emailField.addEventListener('input', emailHandler);
	firstNameField.addEventListener('input', firstNameHandler);
	secondNameField.addEventListener('input', secondNameHandler);
	phoneField.addEventListener('input', phoneHandler);
};

window.onunload = () => {
	if (!(loginField && passwordField && emailField && firstNameField && secondNameField && phoneField)) {
		throw new Error();
	}

	loginField.removeEventListener('input', loginHandler);
	passwordField.removeEventListener('input', passwordHandler);
	emailField.removeEventListener('input', emailHandler);
	firstNameField.removeEventListener('input', firstNameHandler);
	secondNameField.removeEventListener('input', secondNameHandler);
	phoneField.removeEventListener('input', phoneHandler);
};

export default {
	signUp() {
		console.log(`Логин: ${login}, пароль: ${password}, почта: ${email}, имя: ${firstName}, фамилия: ${secondName}, телефон: ${phone}`);
		window.location.href = '/index.html';
	},
	redirectToSignIn() {
		window.location.href = '/signin.html';
	},
};
