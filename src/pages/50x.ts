import Block from '../common/block';
import {compile} from '../utils/compile';
import Err50xPage from './50x/50x';
import '../common.scss';

export default class Err50x extends Block {
	private readonly errPage = new Err50xPage();
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
