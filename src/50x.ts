import './common.scss';
import Block from './common/block';
import Err50xPage from './pages/50x/50x';
import {compile} from './utils/compile';

export default class Err50x extends Block {
	constructor() {
		super('div', {
			errPage: new Err50xPage(),
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

const index = new Err50x();
index.render();
