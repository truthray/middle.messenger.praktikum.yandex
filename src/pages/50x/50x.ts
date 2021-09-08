import {useRouter} from './../../common/router';
import './50x.scss';
import * as pug from 'pug';
import Block from '../../common/block';
import StyledBtn from '../../components/base/styled-btn/styled-btn';

export default class Err50xPage extends Block {
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
		// Const file = readFileSync(__dirname + '/50x.pug', 'utf8');

		const html = pug.render(__dirname + '/50x.pug', {
			backToMainBtn: (this.props.backToMainBtn as Block).blockWithId(),
		});

		return html;
	}
}
