import {UserInfo} from './../../models/user';
import {AuthApi} from '../../api/auth-api';
import {useRouter} from './../../common/router';
import {sixSymbolsRule} from './../../utils/rules';
import * as pug from 'pug';
import Block from '../../common/block';
import './signin.scss';
import {readFileSync} from 'fs';
import StyledInput from '../../components/base/styled-input/styled-input';
import StyledBtn from '../../components/base/styled-btn/styled-btn';

export default class SigninPage extends Block {
	constructor() {
		super('div', {
			loginInput: new StyledInput({label: 'Логин', rules: [{rule: sixSymbolsRule, msg: 'Логин должен быть больше 6 символов'}]}),
			passwordInput: new StyledInput({label: 'Пароль', rules: [{rule: sixSymbolsRule, msg: 'Пароль должен быть больше 6 символов'}], isPassword: true}),
			signInBtn: new StyledBtn({}),
			signUpBtn: new StyledBtn({label: 'Зарегистрироваться', type: 'button', events: {
				click: (e: Event) => {
					e.preventDefault();
					useRouter()?.go('/sign-up');
				},
			}}),
		});

		(this.props.signInBtn as Block).setProps({label: 'Войти', type: 'submit', fields: [this.props.loginInput, this.props.passwordInput], events: {
			click: (e: Event) => {
				e.preventDefault();
				const user: UserInfo = {
					login: (this.props.loginInput as StyledInput).value,
					password: (this.props.passwordInput as StyledInput).value,
				};
				AuthApi.signin(user).then(e => {
					if ((e as XMLHttpRequest).status === 200) {
						useRouter()?.go('/messenger');
					}
				}).catch(e => {
					console.log(e);
				});
			},
		}});
	}

	render() {
		const file = readFileSync(__dirname + '/signin.pug', 'utf8');

		const html = pug.render(file, {
			loginInput: (this.props.loginInput as Block).blockWithId(),
			passwordInput: (this.props.passwordInput as Block).blockWithId(),
			signInBtn: (this.props.signInBtn as Block).blockWithId(),
			signUpBtn: (this.props.signUpBtn as Block).blockWithId(),
		});

		return html;
	}
}
