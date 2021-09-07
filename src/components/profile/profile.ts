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
	private readonly avatar = new Avatar({large: true, events: {click: () => {
		const avatarInput = document.getElementById('person_avatar_input');
		avatarInput?.removeEventListener('input', this.avatarHandler);
		avatarInput?.addEventListener('input', this.avatarHandler);
		avatarInput?.click();
	}}});

	private readonly emailInput = new StyledInput({label: 'Email', rules: [{rule: emailRule, msg: 'Email должен соответствовать шаблону'}]});
	private readonly loginInput = new StyledInput({label: 'Логин', rules: [{rule: sixSymbolsRule, msg: 'Логин должен быть больше 6 символов'}]});
	private readonly phoneInput = new StyledInput({label: 'Телефон', rules: [{rule: phoneRule, msg: 'Телефон должен соответствовать шаблону'}]});
	private readonly nameInput = new StyledInput({label: 'Имя', rules: [{rule: sixSymbolsRule, msg: 'Имя должно быть больше 6 символов'}]});
	private readonly surnameInput = new StyledInput({label: 'Фамилия', rules: [{rule: sixSymbolsRule, msg: 'Фамилия должна быть больше 6 символов'}]});
	private readonly displayNameInput = new StyledInput({label: 'Отображаемое имя', rules: [{rule: sixSymbolsRule, msg: 'Отображаемое имя должно быть больше 6 символов'}]});
	private readonly saveBtn = new StyledBtn({});
	private readonly newPasswordInput = new StyledInput({label: 'Новый', isPassword: true, rules: [{rule: sixSymbolsRule, msg: 'Пароль должен быть больше 6 символов'}]});
	private readonly oldPasswordInput = new StyledInput({label: 'Старый пароль', isPassword: true});
	private readonly pwdBtn = new StyledBtn({});
	private readonly exitBtn = new StyledBtn({label: 'Выйти', events: {
		click: (e: Event) => {
			e.preventDefault();

			AuthApi.logout().then(() => {
				useRouter()?.go('/');
			}).catch(e => {
				console.log(e);
			});
		},
	}});

	constructor(private readonly fetchUser: () => void) {
		super('div', {});

		this.setProps({
			...this.props, avatar: this.avatar, emailInput: this.emailInput, loginInput: this.loginInput, phoneInput: this.phoneInput,
			nameInput: this.nameInput, surnameInput: this.surnameInput, displayNameInput: this.displayNameInput, saveBtn: this.saveBtn,
			newPasswordInput: this.newPasswordInput, oldPasswordInput: this.oldPasswordInput, pwdBtn: this.pwdBtn, exitBtn: this.exitBtn,
		});
		this.avatarHandler = this.avatarHandler.bind(this);
		this.saveBtn.setProps({
			label: 'Сохранить',
			type: 'submit',
			fields: [this.emailInput, this.loginInput, this.nameInput, this.surnameInput, this.displayNameInput, this.phoneInput],
			events: {
				click: (e: Event) => {
					e.preventDefault();
					if (!this.saveBtn.validate()) {
						return;
					}

					const user: EditUserDto = {
						first_name: this.nameInput.value,
						second_name: this.surnameInput.value,
						display_name: this.displayNameInput.value,
						login: this.loginInput.value,
						email: this.emailInput.value,
						phone: this.phoneInput.value,
					};
					UserApi.update(user).then(() => {
						this.setProps({...this.props, showUpdateAnimation: true, user});
						setTimeout(() => {
							this.setProps({...this.props, showUpdateAnimation: false});
						}, 3000);
					}).catch(e => {
						console.log(e);
					});
				},
			},
		});

		this.pwdBtn.setProps({
			label: 'Сменить пароль',
			type: 'submit',
			fields: [this.props.newPasswordInput, this.props.oldPasswordInput],
			events: {
				click: (e: Event) => {
					e.preventDefault();
					if (!this.pwdBtn.validate()) {
						return;
					}

					const pwd: PasswordDto = {newPassword: this.newPasswordInput.value, oldPassword: this.oldPasswordInput.value};
					UserApi.updatePassword(pwd)
						.then(() => {
							this.fetchUser();
							this.setProps({...this.props, showPasswordUpdateAnimation: true});
							setTimeout(() => {
								this.setProps({...this.props, showPasswordUpdateAnimation: false});
							}, 3000);
						}).catch(e => {
							console.log(e);
						});
				},
			},
		});
	}

	async avatarHandler(e: Event) {
		const target = (e.target as HTMLInputElement);
		if (!target) {
			return;
		}

		if (target.files && target.files.length > 0) {
			const file = target.files[0];
			if (file) {
				const avatar = await (toBase64(file));
				const formData = new FormData();
				formData.append('avatar', file);
				UserApi.updateAvatar(formData)
					.then(() => {
						this.avatar.setProps({...this.avatar.props, url: avatar});
					}).catch(e => {
						console.log(e);
					});
			}
		}
	}

	componentDidUpdate() {
		if (this.props.user) {
			const user = this.props.user as UserDto;
			this.emailInput.setProps({...this.emailInput.props, value: user.email});
			this.loginInput.setProps({...this.loginInput.props, value: user.login});
			this.phoneInput.setProps({...this.phoneInput.props, value: user.phone});
			this.nameInput.setProps({...this.nameInput.props, value: user.first_name});
			this.surnameInput.setProps({...this.surnameInput.props, value: user.second_name});
			this.displayNameInput.setProps({...this.displayNameInput.props, value: user.display_name});
			if (user.avatar) {
				this.avatar.setProps({...this.avatar.props, url: `https://ya-praktikum.tech/api/v2/resources/${user.avatar}`});
			}
		}

		return true;
	}

	render() {
		const file = readFileSync(__dirname + '/profile.pug', 'utf8');
		const html = pug.render(file, {
			...this.props,
			avatar: this.avatar.blockWithId(),
			emailInput: this.emailInput.blockWithId(),
			loginInput: this.loginInput.blockWithId(),
			phoneInput: this.phoneInput.blockWithId(),
			nameInput: this.nameInput.blockWithId(),
			surnameInput: this.surnameInput.blockWithId(),
			displayNameInput: this.displayNameInput.blockWithId(),
			newPasswordInput: this.newPasswordInput.blockWithId(),
			oldPasswordInput: this.oldPasswordInput.blockWithId(),
			saveBtn: this.saveBtn.blockWithId(),
			pwdBtn: this.pwdBtn.blockWithId(),
			exitBtn: this.exitBtn.blockWithId(),
		});
		window.onload = () => {
			compile(html);
		};

		return html;
	}
}
