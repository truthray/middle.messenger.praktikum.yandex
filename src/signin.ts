import Block from './common/block';
import SigninPage from './pages/signin/signin';
import {compile} from './utils/compile';

export default class Signin extends Block {
	constructor() {
		super('div', {
			signinPage: new SigninPage(),
		});
	}

	render() {
		const page = (this.props.signinPage as Block).blockWithId();

		window.onload = () => {
			compile(page);
			(this.props.signinPage as Block)._render();
		};

		return page;
	}
}

const signin = new Signin();
signin.render();
