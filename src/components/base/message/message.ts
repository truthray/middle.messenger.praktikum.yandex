import './message.scss';
import Block from '../../../common/block';
import * as pug from 'pug';
import pages from '../../../pages';

export default class MessageArea extends Block {
	constructor(props: any) {
		super('div', props);
	}

	render() {
		const html = pug.render(pages.message, this.props);
		return html;
	}
}
