import './avatar.scss';
import Block from '../../../common/block';
import * as pug from 'pug';
import {readFileSync} from 'fs';

export default class Avatar extends Block {
	constructor(props: any) {
		super('div', props);
	}

	render() {
		const file = readFileSync(__dirname + '/avatar.pug', 'utf8');
		const html = pug.render(file, this.props);
		return html;
	}
}
