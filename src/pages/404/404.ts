import './404.scss';
import * as pug from 'pug';
import Block from '../../common/block';
import StyledBtn from '../../components/base/styled-btn/styled-btn';
import {useRouter} from '../../common/router';
import pages from '../../pages';

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
		const html = pug.render(pages.page404, {
			backToMainBtn: (this.props.backToMainBtn as Block).blockWithId(),
		});

		return html;
	}
}
