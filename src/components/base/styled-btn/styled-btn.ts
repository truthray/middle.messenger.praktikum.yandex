import Block from '../../../common/block';
import * as pug from 'pug';
import {readFileSync} from 'fs';
import './styled-btn.scss';
import StyledInput from '../styled-input/styled-input';

export default class StyledBtn extends Block {
	constructor(props: any) {
		super('div', props);
		this.validate = this.validate.bind(this);
	}

	componentDidMount() {
		// If (this.props.type) {
		// const btn = this.getContent()?.getElementsByTagName('button')[0];
		// btn?.addEventListener('click', this.validate);
		// }
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
		const file = readFileSync(__dirname + '/styled-btn.pug', 'utf8');
		const html = pug.render(file, this.props);
		return html;
	}
}
