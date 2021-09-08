import './styled-control-btn.scss';
import Block from '../../../common/block';
import * as pug from 'pug';
import pages from '../../../pages';

export default class StyledControlBtn extends Block {
	constructor(props: any) {
		super('div', props);
	}

	render() {
		// Const file = readFileSync(__dirname + '/styled-control-btn.pug', 'utf8');
		const html = pug.render(pages.styledControlBtn, this.props);
		return html;
	}
}
