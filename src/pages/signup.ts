import Block from '../common/block';
import {compile} from '../utils/compile';
import SignupPage from './signup/signup';

export default class Signup extends Block {
	private readonly signupPage = new SignupPage();
	constructor() {
		super('div', {});
		this.setProps({...this.props, signupPage: this.signupPage});
	}

	render() {
		const page = this.signupPage.blockWithId();

		compile(page);
		this.signupPage._render();

		return page;
	}
}
