import Block from '../../../common/block';
import * as pug from 'pug';
import {readFileSync} from 'fs';
import './message-input.scss';

export default class MessageInput extends Block {
	public value = '';
	private field: HTMLInputElement | undefined;

	constructor(props: any) {
		super('div', {...props});
		this.input = this.input.bind(this);
		this.getValue = this.getValue.bind(this);
		this.setProps({...this.props, value: this.value});
	}

	input(e: Event) {
		this.value = (e.target as HTMLInputElement).value;
	}

	getValue() {
		return this.value;
	}

	componentDidUpdate() {
		this.value = '';
		return true;
	}

	componentDidMount() {
		this.field = this.getContent()?.getElementsByTagName('input')[0];
		if (this.field) {
			this.field.addEventListener('input', this.input);
		}
	}

	render() {
		const file = readFileSync(__dirname + '/message-input.pug', 'utf8');
		const html = pug.render(file, {...this.props});

		return html;
	}
}
