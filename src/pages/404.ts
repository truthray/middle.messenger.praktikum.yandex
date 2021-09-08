import Block from '../common/block';
import {compile} from '../utils/compile';
import Err404Page from './404/404';
import '../common.scss';

export default class Err404 extends Block {
	private readonly errPage = new Err404Page();
	constructor() {
		super('div', {});
		this.setProps({...this.props, errPage: this.errPage});
	}

	render() {
		const page = this.errPage.blockWithId();

		compile(page);
		this.errPage._render();

		return page;
	}
}
