import './avatar.scss';
import Block from '../../../common/block';
import * as pug from 'pug';
import pages from '../../../pages';

export default class Avatar extends Block {
	constructor(props: any) {
		super('div', props);
	}

	render() {
		// Const file = readFileSync(__dirname + '/avatar.pug', 'utf8');
		const html = pug.render(pages.avatar, this.props);
		return html;
	}
}
