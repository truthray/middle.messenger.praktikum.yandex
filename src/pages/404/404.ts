import './404.scss';
import * as pug from 'pug';
import Block from '../../common/block';
import {readFileSync} from 'fs';
import StyledBtn from '../../components/base/styled-btn/styled-btn';
import {useRouter} from '../../common/router';

export default class Err404Page extends Block {
	constructor() {
		super('div', {
			backToMainBtn: new StyledBtn({label: 'На главную', type: 'button', events: {
				click: () => {
					useRouter()?.go('/messenger');
				},
			}}),
		});
	}

	render() {
		const file = readFileSync(__dirname + '/404.pug', 'utf8');

		const html = pug.render(file, {
			backToMainBtn: (this.props.backToMainBtn as Block).blockWithId(),
		});

		return html;
	}
}
