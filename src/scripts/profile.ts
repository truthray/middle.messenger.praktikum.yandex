let loginField: HTMLInputElement | null;
let oldPasswordField: HTMLInputElement | null;
let newPasswordField: HTMLInputElement | null;
let emailField: HTMLInputElement | null;
let firstNameField: HTMLInputElement | null;
let secondNameField: HTMLInputElement | null;
let phoneField: HTMLInputElement | null;
let avatarInput: HTMLInputElement | null;
let login = '';
let newPassword = '';
let oldPassword = '';
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

const newPasswordHandler = (e: Event) => {
	const target = e.target as HTMLInputElement;
	if (target) {
		newPassword = target.value;
	}
};

const oldPasswordHandler = (e: Event) => {
	const target = e.target as HTMLInputElement;
	if (target) {
		oldPassword = target.value;
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

export default {
	init() {
		loginField = document.querySelector('#Логин');
		newPasswordField = document.querySelector('#Новый пароль');
		oldPasswordField = document.querySelector('#Старый пароль');
		emailField = document.querySelector('#Почта');
		firstNameField = document.querySelector('#Имя');
		secondNameField = document.querySelector('#Фамилия');
		phoneField = document.querySelector('#Телефон');
		avatarInput = document.querySelector('#avatar_input');

		if (!(loginField && newPasswordField && oldPasswordField && emailField && firstNameField && secondNameField && phoneField)) {
			throw new Error();
		}

		login = loginField.value;
		newPassword = newPasswordField.value;
		oldPassword = oldPasswordField.value;
		email = emailField.value;
		firstName = firstNameField.value;
		secondName = secondNameField.value;
		phone = phoneField.value;

		loginField.addEventListener('input', loginHandler);
		newPasswordField.addEventListener('input', newPasswordHandler);
		oldPasswordField.addEventListener('input', oldPasswordHandler);
		emailField.addEventListener('input', emailHandler);
		firstNameField.addEventListener('input', firstNameHandler);
		secondNameField.addEventListener('input', secondNameHandler);
		phoneField.addEventListener('input', phoneHandler);
	},
	destroy() {
		if (!(loginField && newPasswordField && oldPasswordField && emailField && firstNameField && secondNameField && phoneField)) {
			throw new Error();
		}

		loginField.removeEventListener('input', loginHandler);
		newPasswordField.removeEventListener('input', newPasswordHandler);
		oldPasswordField.removeEventListener('input', oldPasswordHandler);
		emailField.removeEventListener('input', emailHandler);
		firstNameField.removeEventListener('input', firstNameHandler);
		secondNameField.removeEventListener('input', secondNameHandler);
		phoneField.removeEventListener('input', phoneHandler);
	},
	saveChanges() {
		console.log(`Почта: ${email}, Логин: ${login}, Имя: ${firstName}, Фамилия: ${secondName}, Телефон: ${phone}, Новый пароль: ${newPassword}, Старый пароль: ${oldPassword}`);
	},
	signOut() {
		window.location.href = '/signin.html';
	},
	onAvatarClick() {
		avatarInput?.click();
	},
};
