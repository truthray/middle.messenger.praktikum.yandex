import {Router} from './../../common/router';
import {emailRule, sixSymbolsRule, phoneRule} from './../../utils/rules';
import * as pug from 'pug';
import Block from '../../common/block';
import './signup.scss';
import {compile} from '../../utils/compile';
import {readFileSync} from 'fs';
import StyledInput from '../../components/base/styled-input/styled-input';
import StyledBtn from '../../components/base/styled-btn/styled-btn';

export default class SignupPage extends Block {
	constructor() {
		super('div', {
			emailInput: new StyledInput({label: 'Email', rules: [{rule: emailRule, msg: 'Email должен соответствовать шаблону'}]}),
			loginInput: new StyledInput({label: 'Логин', rules: [{rule: sixSymbolsRule, msg: 'Логин должен быть больше 6 символов'}]}),
			phoneInput: new StyledInput({label: 'Телефон', rules: [{rule: phoneRule, msg: 'Телефон должен соответствовать шаблону'}]}),
			nameInput: new StyledInput({label: 'Имя', rules: [{rule: sixSymbolsRule, msg: 'Имя должно быть больше 6 символов'}]}),
			surnameInput: new StyledInput({label: 'Фамилия', rules: [{rule: sixSymbolsRule, msg: 'Фамилия должна быть больше 6 символов'}]}),
			passwordInput: new StyledInput({label: 'Пароль', isPassword: true, rules: [{rule: sixSymbolsRule, msg: 'Пароль должен быть больше 6 символов'}]}),
			passwordAgainInput: new StyledInput({label: 'Пароль (еще раз)', isPassword: true, rules: [{rule: sixSymbolsRule, msg: 'Пароль должен быть больше 6 символов'}]}),
			signInBtn: new StyledBtn({label: 'Войти', type: 'button', events: {
				click: (e: Event) => {
					e.preventDefault();
					Router.instance?.go('/signin');
				},
			}}),
			signUpBtn: new StyledBtn({}),
		});

		(this.props.signUpBtn as Block).setProps({
			label: 'Зарегистрироваться',
			type: 'submit',
			fields: [this.props.emailInput, this.props.loginInput, this.props.nameInput, this.props.surnameInput, this.props.phoneInput, this.props.passwordInput, this.props.passwordAgainInput],
			events: {
				click: () => {
					console.log(`Регистрация: Логин - ${(this.props.loginInput as StyledInput).value}, Пароль - ${(this.props.passwordInput as StyledInput).value}, Пароль еще раз - ${(this.props.passwordAgainInput as StyledInput).value}, Email - ${(this.props.emailInput as StyledInput).value}, Телефон - ${(this.props.phoneInput as StyledInput).value}, Имя - ${(this.props.nameInput as StyledInput).value}, Фамилия - ${(this.props.surnameInput as StyledInput).value}`);
				},
			}});
	}

	render() {
		const file = readFileSync(__dirname + '/signup.pug', 'utf8');
		const html = pug.render(file, {
			emailInput: (this.props.emailInput as Block).blockWithId(),
			loginInput: (this.props.loginInput as Block).blockWithId(),
			phoneInput: (this.props.phoneInput as Block).blockWithId(),
			nameInput: (this.props.nameInput as Block).blockWithId(),
			surnameInput: (this.props.surnameInput as Block).blockWithId(),
			passwordInput: (this.props.passwordInput as Block).blockWithId(),
			passwordAgainInput: (this.props.passwordAgainInput as Block).blockWithId(),
			signInBtn: (this.props.signInBtn as Block).blockWithId(),
			signUpBtn: (this.props.signUpBtn as Block).blockWithId(),
		});
		window.onload = () => {
			compile(html);
		};

		return html;
	}
}
