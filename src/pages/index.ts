import Block from '../common/block';
import {compile} from '../utils/compile';
import IndexPage from './index/index';

export default class Index extends Block {
	private readonly indexPage = new IndexPage();
	constructor() {
		super('div', {});
		this.setProps({...this.props, indexPage: this.indexPage});
	}

	render() {
		const page = this.indexPage.blockWithId();

		compile(page);
		this.indexPage._render();

		return page;
	}
}
