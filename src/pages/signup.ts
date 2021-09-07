import Block from '../common/block';
import {compile} from '../utils/compile';
import SignupPage from './signup/signup';

export default class Signup extends Block {
	constructor() {
		super('div', {
			signupPage: new SignupPage(),
		});
	}

	render() {
		const page = (this.props.signupPage as Block).blockWithId();

		compile(page);
		(this.props.signupPage as Block)._render();

		return page;
	}
}
