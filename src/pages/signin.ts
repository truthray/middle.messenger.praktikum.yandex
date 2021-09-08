import Block from '../common/block';
import {compile} from '../utils/compile';
import SigninPage from './signin/signin';

export default class Signin extends Block {
	private readonly signinPage = new SigninPage();
	constructor() {
		super('div', {});
		this.setProps({...this.props, signinPage: this.signinPage});
	}

	render() {
		const page = this.signinPage.blockWithId();

		compile(page);
		this.signinPage._render();
		return page;
	}
}
