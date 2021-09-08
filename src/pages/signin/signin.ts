import {UserInfo} from './../../models/user';
import {AuthApi} from '../../api/auth-api';
import {useRouter} from './../../common/router';
import * as pug from 'pug';
import Block from '../../common/block';
import './signin.scss';
import StyledInput from '../../components/base/styled-input/styled-input';
import StyledBtn from '../../components/base/styled-btn/styled-btn';
import pages from '../../pages';

export default class SigninPage extends Block {
	private readonly loginInput = new StyledInput({label: 'Логин'});
	private readonly passwordInput = new StyledInput({label: 'Пароль', isPassword: true});
	private readonly signInBtn = new StyledBtn({});
	private readonly signUpBtn = new StyledBtn({
		label: 'Зарегистрироваться',
		type: 'button',
		events: {
			click: (e: Event) => {
				e.preventDefault();
				useRouter()?.go('/sign-up');
			},
		},
	});

	constructor() {
		super('div', {});
		this.setProps({...this.props, loginInput: this.loginInput, passwordInput: this.passwordInput, signInBtn: this.signInBtn, signUpBtn: this.signUpBtn});
		this.signInBtn.setProps({label: 'Войти', type: 'submit', fields: [this.loginInput, this.passwordInput], events: {
			click: (e: Event) => {
				e.preventDefault();
				if (!this.signInBtn.validate()) {
					return;
				}

				const user: UserInfo = {
					login: this.loginInput.value,
					password: this.passwordInput.value,
				};
				AuthApi.signin(user).then(e => {
					if (e.status === 200) {
						useRouter()?.go('/messenger');
					}
				}).catch(e => {
					console.log(e);
				});
			},
		}});
	}

	render() {
		// Const file = readFileSync(__dirname + '/signin.pug', 'utf8');

		const html = pug.render(pages.signin, {
			loginInput: this.loginInput.blockWithId(),
			passwordInput: this.passwordInput.blockWithId(),
			signInBtn: this.signInBtn.blockWithId(),
			signUpBtn: this.signUpBtn.blockWithId(),
		});

		return html;
	}
}
