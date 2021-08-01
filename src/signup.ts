import Block from './common/block';
import SignupPage from './pages/signup/signup';
import {compile} from './utils/compile';

export default class Signup extends Block {
	constructor() {
		super('div', {
			signupPage: new SignupPage(),
		});
	}

	render() {
		const page = (this.props.signupPage as Block).blockWithId();

		window.onload = () => {
			compile(page);
			(this.props.signupPage as Block)._render();
		};

		return page;
	}
}

const signup = new Signup();
signup.render();
