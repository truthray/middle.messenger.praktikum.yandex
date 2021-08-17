import Block from '../common/block';
import {compile} from '../utils/compile';
import Err404Page from './404/404';
import '../common.scss';

export default class Err404 extends Block {
	constructor() {
		super('div', {
			errPage: new Err404Page(),
		});
	}

	render() {
		const page = (this.props.errPage as Block).blockWithId();

		compile(page);
		(this.props.errPage as Block)._render();

		return page;
	}
}
