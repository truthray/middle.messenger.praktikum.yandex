import {AuthApi} from './../../api/auth-api';
import {NewUserDto} from './../../models/user';
import {useRouter} from './../../common/router';
import {emailRule, sixSymbolsRule, phoneRule} from './../../utils/rules';
import * as pug from 'pug';
import Block from '../../common/block';
import './signup.scss';
import {compile} from '../../utils/compile';
import {readFileSync} from 'fs';
import StyledInput from '../../components/base/styled-input/styled-input';
import StyledBtn from '../../components/base/styled-btn/styled-btn';

export default class SignupPage extends Block {
	private readonly emailInput = new StyledInput({label: 'Email', rules: [{rule: emailRule, msg: 'Email должен соответствовать шаблону'}]});
	private readonly loginInput = new StyledInput({label: 'Логин', rules: [{rule: sixSymbolsRule, msg: 'Логин должен быть больше 6 символов'}]});
	private readonly phoneInput = new StyledInput({label: 'Телефон', rules: [{rule: phoneRule, msg: 'Телефон должен соответствовать шаблону'}]});
	private readonly nameInput = new StyledInput({label: 'Имя', rules: [{rule: sixSymbolsRule, msg: 'Имя должно быть больше 6 символов'}]});
	private readonly surnameInput = new StyledInput({label: 'Фамилия', rules: [{rule: sixSymbolsRule, msg: 'Фамилия должна быть больше 6 символов'}]});
	private readonly passwordInput = new StyledInput({label: 'Пароль', isPassword: true, rules: [{rule: sixSymbolsRule, msg: 'Пароль должен быть больше 6 символов'}]});
	private readonly passwordAgainInput = new StyledInput({label: 'Пароль (еще раз)', isPassword: true, rules: [{rule: sixSymbolsRule, msg: 'Пароль должен быть больше 6 символов'}]});
	private readonly signUpBtn = new StyledBtn({});
	private readonly signInBtn = new StyledBtn({
		label: 'Войти',
		type: 'button',
		events: {
			click: (e: Event) => {
				e.preventDefault();
				useRouter()?.go('/');
			},
		},
	});

	constructor() {
		super('div', {});
		this.setProps({
			...this.props, emailInput: this.emailInput, loginInput: this.loginInput, phoneInput: this.phoneInput, nameInput: this.nameInput, surnameInput: this.surnameInput,
			passwordInput: this.passwordInput, passwordAgainInput: this.passwordAgainInput, signUpBtn: this.signUpBtn, signInBtn: this.signInBtn,
		});

		this.signUpBtn.setProps({
			label: 'Зарегистрироваться',
			type: 'submit',
			fields: [this.emailInput, this.loginInput, this.nameInput, this.surnameInput, this.phoneInput, this.passwordInput, this.passwordAgainInput],
			events: {
				click: (e: Event) => {
					e.preventDefault();
					if (!this.signUpBtn.validate()) {
						return;
					}

					const user: NewUserDto = {
						first_name: this.nameInput.value,
						second_name: this.surnameInput.value,
						login: this.loginInput.value,
						email: this.emailInput.value,
						password: this.passwordInput.value,
						phone: this.phoneInput.value,
					};

					AuthApi.signup(user).then(res => {
						if (res.status === 200) {
							useRouter()?.go('/messenger');
						}
					}).catch(e => {
						console.log(e);
					});
				},
			}});
	}

	render() {
		const file = readFileSync(__dirname + '/signup.pug', 'utf8');
		const html = pug.render(file, {
			emailInput: this.emailInput.blockWithId(),
			loginInput: this.loginInput.blockWithId(),
			phoneInput: this.phoneInput.blockWithId(),
			nameInput: this.nameInput.blockWithId(),
			surnameInput: this.surnameInput.blockWithId(),
			passwordInput: this.passwordInput.blockWithId(),
			passwordAgainInput: this.passwordAgainInput.blockWithId(),
			signInBtn: this.signInBtn.blockWithId(),
			signUpBtn: this.signUpBtn.blockWithId(),
		});
		window.onload = () => {
			compile(html);
		};

		return html;
	}
}
