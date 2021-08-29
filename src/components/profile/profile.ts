import {UserApi} from './../../api/user-api';
import {UserDto, EditUserDto, PasswordDto} from './../../models/user';
import {AuthApi} from '../../api/auth-api';
import {useRouter} from './../../common/router';
import {phoneRule} from './../../utils/rules';
import './profile.scss';
import * as pug from 'pug';
import Block from '../../common/block';
import {compile} from '../../utils/compile';
import {readFileSync} from 'fs';
import StyledInput from '../../components/base/styled-input/styled-input';
import StyledBtn from '../../components/base/styled-btn/styled-btn';
import {emailRule, sixSymbolsRule} from '../../utils/rules';
import Avatar from '../base/avatar/avatar';
import {toBase64} from '../../utils/toBase64';

export default class ProfileArea extends Block {
	constructor() {
		super('div', {
			avatar: new Avatar({large: true, events: {click: () => {
				const avatarInput = document.getElementById('avatar_input');
				avatarInput?.removeEventListener('input', this.avatarHandler);
				avatarInput?.addEventListener('input', this.avatarHandler);
				avatarInput?.click();
			}}}),
			emailInput: new StyledInput({label: 'Email', rules: [{rule: emailRule, msg: 'Email должен соответствовать шаблону'}]}),
			loginInput: new StyledInput({label: 'Логин', rules: [{rule: sixSymbolsRule, msg: 'Логин должен быть больше 6 символов'}]}),
			phoneInput: new StyledInput({label: 'Телефон', rules: [{rule: phoneRule, msg: 'Телефон должен соответствовать шаблону'}]}),
			nameInput: new StyledInput({label: 'Имя', rules: [{rule: sixSymbolsRule, msg: 'Имя должно быть больше 6 символов'}]}),
			surnameInput: new StyledInput({label: 'Фамилия', rules: [{rule: sixSymbolsRule, msg: 'Фамилия должна быть больше 6 символов'}]}),
			displayNameInput: new StyledInput({label: 'Отображаемое имя', rules: [{rule: sixSymbolsRule, msg: 'Отображаемое имя должно быть больше 6 символов'}]}),
			saveBtn: new StyledBtn({}),

			newPasswordInput: new StyledInput({label: 'Новый', isPassword: true, rules: [{rule: sixSymbolsRule, msg: 'Пароль должен быть больше 6 символов'}]}),
			oldPasswordInput: new StyledInput({label: 'Старый пароль', isPassword: true, rules: [{rule: sixSymbolsRule, msg: 'Пароль должен быть больше 6 символов'}]}),
			pwdBtn: new StyledBtn({}),
			exitBtn: new StyledBtn({label: 'Выйти', events: {
				click: (e: Event) => {
					e.preventDefault();

					AuthApi.logout().then(() => {
						useRouter()?.go('/signin');
					}).catch(e => {
						console.log(e);
					});
				},
			}}),
		});

		this.avatarHandler = this.avatarHandler.bind(this);
		(this.props.saveBtn as Block).setProps({
			label: 'Сохранить',
			type: 'submit',
			fields: [this.props.emailInput, this.props.loginInput, this.props.nameInput, this.props.surnameInput, this.props.displayNameInput, this.props.phoneInput],
			events: {
				click: (e: Event) => {
					e.preventDefault();

					const user: EditUserDto = {
						first_name: (this.props.nameInput as StyledInput).value,
						second_name: (this.props.surnameInput as StyledInput).value,
						display_name: (this.props.displayNameInput as StyledInput).value,
						login: (this.props.loginInput as StyledInput).value,
						email: (this.props.emailInput as StyledInput).value,
						phone: (this.props.phoneInput as StyledInput).value,
					};
					UserApi.update(user).catch(e => {
						console.log(e);
					});
				},
			},
		});

		(this.props.pwdBtn as Block).setProps({
			label: 'Сменить пароль',
			type: 'submit',
			fields: [this.props.newPasswordInput, this.props.oldPasswordInput],
			events: {
				click: (e: Event) => {
					e.preventDefault();

					const pwd: PasswordDto = {newPassword: (this.props.newPasswordInput as StyledInput).value, oldPassword: (this.props.oldPasswordInput as StyledInput).value};
					UserApi.updatePassword(pwd).catch(e => {
						console.log(e);
					});
				},
			},
		});
	}

	async avatarHandler(e: {target: {files: File[]}}) {
		if (e.target.files.length < 0) {
			return;
		}

		const file = e.target.files[0];
		if (file) {
			const avatar = await (toBase64(file));
			const formData = new FormData();
			formData.append('avatar', file);
			(this.props.avatar as Block).setProps({...(this.props.avatar as Block).props, url: avatar});
			UserApi.updateAvatar(formData).catch(e => {
				console.log(e);
			});
		}
	}

	componentDidUpdate() {
		if (this.props.user) {
			const user = this.props.user as UserDto;
			(this.props.emailInput as Block).setProps({...(this.props.emailInput as Block).props, value: user.email});
			(this.props.loginInput as Block).setProps({...(this.props.loginInput as Block).props, value: user.login});
			(this.props.phoneInput as Block).setProps({...(this.props.phoneInput as Block).props, value: user.phone});
			(this.props.nameInput as Block).setProps({...(this.props.nameInput as Block).props, value: user.first_name});
			(this.props.surnameInput as Block).setProps({...(this.props.surnameInput as Block).props, value: user.second_name});
			(this.props.displayNameInput as Block).setProps({...(this.props.displayNameInput as Block).props, value: user.display_name});
			(this.props.avatar as Block).setProps({...(this.props.avatar as Block).props, url: `https://ya-praktikum.tech/api/v2/resources/${user.avatar}`});
		}

		return true;
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
			displayNameInput: (this.props.displayNameInput as Block).blockWithId(),
			newPasswordInput: (this.props.newPasswordInput as Block).blockWithId(),
			oldPasswordInput: (this.props.oldPasswordInput as Block).blockWithId(),
			saveBtn: (this.props.saveBtn as Block).blockWithId(),
			pwdBtn: (this.props.pwdBtn as Block).blockWithId(),
			exitBtn: (this.props.exitBtn as Block).blockWithId(),
		});
		window.onload = () => {
			compile(html);
		};

		return html;
	}
}
