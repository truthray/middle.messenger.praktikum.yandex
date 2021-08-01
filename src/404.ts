import './common.scss';
import Block from './common/block';
import Err404Page from './pages/404/404';
import {compile} from './utils/compile';

export default class Err404 extends Block {
	constructor() {
		super('div', {
			errPage: new Err404Page(),
		});
	}

	render() {
		const page = (this.props.errPage as Block).blockWithId();

		window.onload = () => {
			compile(page);
			(this.props.errPage as Block)._render();
		};

		return page;
	}
}

const index = new Err404();
index.render();
