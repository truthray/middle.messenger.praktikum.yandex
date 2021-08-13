import './styled-control-btn.scss';
import Block from '../../../common/block';
import * as pug from 'pug';
import {readFileSync} from 'fs';

export default class StyledControlBtn extends Block {
	constructor(props: any) {
		super('div', props);
	}

	render() {
		const file = readFileSync(__dirname + '/styled-control-btn.pug', 'utf8');
		const html = pug.render(file, this.props);
		return html;
	}
}
