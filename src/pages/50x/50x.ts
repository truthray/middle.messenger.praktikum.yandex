import {Router} from './../../common/router';
import './50x.scss';
import * as pug from 'pug';
import Block from '../../common/block';
import {readFileSync} from 'fs';
import StyledBtn from '../../components/base/styled-btn/styled-btn';

export default class Err50xPage extends Block {
	constructor() {
		super('div', {
			backToMainBtn: new StyledBtn({label: 'На главную', type: 'button', events: {
				click: () => {
					Router.instance?.go('/');
				},
			}}),
		});
	}

	render() {
		const file = readFileSync(__dirname + '/50x.pug', 'utf8');

		const html = pug.render(file, {
			backToMainBtn: (this.props.backToMainBtn as Block).blockWithId(),
		});

		return html;
	}
}
