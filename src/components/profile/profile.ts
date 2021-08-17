import {Router} from './../../common/router';
import {phoneRule} from './../../utils/rules';
import './profile.scss';
import * as pug from 'pug';
import Block from '../../common/block';
import {compile} from '../../utils/compile';
import {readFileSync} from 'fs';
import StyledInput from '../../components/base/styled-input/styled-input';
import StyledBtn from '../../components/base/styled-btn/styled-btn';
import {emailRule, sixSymbolsRule} from '../../utils/rules';
import {Person} from '../../models/person';
import Avatar from '../base/avatar/avatar';

export default class ProfileArea extends Block {
	constructor(props: {person: Person}) {
		super('div', {
			...props,
			avatar: new Avatar({large: true, events: {click: () => {
				document.getElementById('avatar_input')?.click();
			}}}),
			emailInput: new StyledInput({label: 'Email', rules: [{rule: emailRule, msg: 'Email должен соответствовать шаблону'}], value: props.person.email || ''}),
			loginInput: new StyledInput({label: 'Логин', rules: [{rule: sixSymbolsRule, msg: 'Логин должен быть больше 6 символов'}], value: props.person.login}),
			phoneInput: new StyledInput({label: 'Телефон', rules: [{rule: phoneRule, msg: 'Телефон должен соответствовать шаблону'}], value: props.person.phone}),
			nameInput: new StyledInput({label: 'Имя', rules: [{rule: sixSymbolsRule, msg: 'Имя должно быть больше 6 символов'}], value: props.person.first_name}),
			surnameInput: new StyledInput({label: 'Фамилия', rules: [{rule: sixSymbolsRule, msg: 'Фамилия должна быть больше 6 символов'}], value: props.person.second_name}),
			newPasswordInput: new StyledInput({label: 'Новый', isPassword: true, rules: [{rule: sixSymbolsRule, msg: 'Пароль должен быть больше 6 символов'}]}),
			oldPasswordInput: new StyledInput({label: 'Старый пароль', isPassword: true, rules: [{rule: sixSymbolsRule, msg: 'Пароль должен быть больше 6 символов'}]}),
			saveBtn: new StyledBtn({}),
			exitBtn: new StyledBtn({label: 'Выйти', events: {
				click: (e: Event) => {
					e.preventDefault();
					Router.instance?.go('/signin');
				},
			}}),
		});

		(this.props.avatar as Block).setProps({...(this.props.avatar as Block).props, url: (this.props.person as Person).avatar});

		(this.props.saveBtn as Block).setProps({
			label: 'Сохранить',
			type: 'submit',
			fields: [this.props.emailInput, this.props.loginInput, this.props.nameInput, this.props.surnameInput, this.props.phoneInput, this.props.newPasswordInput, this.props.oldPasswordInput],
		});
	}

	render() {
		const file = readFileSync(__dirname + '/profile.pug', 'utf8');
		const html = pug.render(file, {
			...this.props,
			avatar: (this.props.avatar as Block).blockWithId(),
			emailInput: (this.props.emailInput as Block).blockWithId(),
			loginInput: (this.props.loginInput as Block).blockWithId(),
			phoneInput: (this.props.phoneInput as Block).blockWithId(),
			nameInput: (this.props.nameInput as Block).blockWithId(),
			surnameInput: (this.props.surnameInput as Block).blockWithId(),
			newPasswordInput: (this.props.newPasswordInput as Block).blockWithId(),
			oldPasswordInput: (this.props.oldPasswordInput as Block).blockWithId(),
			saveBtn: (this.props.saveBtn as Block).blockWithId(),
			exitBtn: (this.props.exitBtn as Block).blockWithId(),
		});
		window.onload = () => {
			compile(html);
		};

		return html;
	}
}
