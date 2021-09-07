import Block from '../common/block';
import {compile} from '../utils/compile';
import IndexPage from './index/index';

export default class Index extends Block {
	constructor() {
		super('div', {
			indexPage: new IndexPage(),
		});
	}

	render() {
		const page = (this.props.indexPage as Block).blockWithId();

		compile(page);
		(this.props.indexPage as Block)._render();

		return page;
	}
}
