import './message.scss';
import Block from '../../../common/block';
import * as pug from 'pug';
import {readFileSync} from 'fs';

export default class MessageArea extends Block {
	constructor(props: any) {
		super('div', props);
	}

	render() {
		const file = readFileSync(__dirname + '/message.pug', 'utf8');
		const html = pug.render(file, this.props);
		return html;
	}
}
