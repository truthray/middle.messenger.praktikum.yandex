import Block from '../common/block';
import {compile} from '../utils/compile';
import Err50xPage from './50x/50x';
import '../common.scss';

export default class Err50x extends Block {
	constructor() {
		super('div', {
			errPage: new Err50xPage(),
		});
	}

	render() {
		const page = (this.props.errPage as Block).blockWithId();

		compile(page);
		(this.props.errPage as Block)._render();

		return page;
	}
}
