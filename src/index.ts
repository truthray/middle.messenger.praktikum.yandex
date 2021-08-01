import Block from './common/block';
import IndexPage from './pages/index';
import {compile} from './utils/compile';

export default class Index extends Block {
	constructor() {
		super('div', {
			indexPage: new IndexPage(),
		});
	}

	render() {
		const page = (this.props.indexPage as Block).blockWithId();

		window.onload = () => {
			compile(page);
			(this.props.indexPage as Block)._render();
		};

		return page;
	}
}

const index = new Index();
index.render();
