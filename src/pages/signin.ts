import Block from '../common/block';
import {compile} from '../utils/compile';
import SigninPage from './signin/signin';

export default class Signin extends Block {
	constructor() {
		super('div', {
			signinPage: new SigninPage(),
		});
	}

	render() {
		const page = (this.props.signinPage as Block).blockWithId();

		compile(page);
		(this.props.signinPage as Block)._render();
		return page;
	}
}
