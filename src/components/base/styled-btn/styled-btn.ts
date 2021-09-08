import Block from '../../../common/block';
import * as pug from 'pug';
import './styled-btn.scss';
import StyledInput from '../styled-input/styled-input';
import pages from '../../../pages';

export default class StyledBtn extends Block {
	constructor(props: any) {
		super('div', props);
		this.validate = this.validate.bind(this);
	}

	validate(): boolean {
		if (this.props.fields) {
			for (const field of this.props.fields) {
				const input = field as StyledInput;
				const isValid = input.validate();
				if (!isValid) {
					input.focus();
					return false;
				}
			}
		}

		return true;
	}

	render() {
		const html = pug.render(pages.styledBtn, this.props);
		return html;
	}
}
