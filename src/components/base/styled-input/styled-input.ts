import Block from '../../../common/block';
import * as pug from 'pug';
import {readFileSync} from 'fs';
import './styled-input.scss';

export default class StyledInput extends Block {
	public value = '';
	public valid = true;
	private field: HTMLInputElement | undefined;

	constructor(props: any) {
		super('div', {...props});
		if (this.props.value) {
			this.value = (this.props.value as string);
		}

		this.focus = this.focus.bind(this);
		this.blur = this.blur.bind(this);
		this.input = this.input.bind(this);
		this.validate = this.validate.bind(this);
	}

	validate(isBlur = false): boolean {
		if (this.props.rules && Array.isArray(this.props.rules)) {
			const error = (this.props.rules as Array<{rule: RegExp; msg: string}>).find((rule: {rule: RegExp; msg: string}) => !rule.rule.test(this.value));

			if (error) {
				this.valid = false;
				this.setProps({
					...this.props,
					valid: this.valid,
					value: this.value,
					msg: error.msg,
				});
			} else {
				this.valid = true;
				this.setProps({
					...this.props,
					valid: this.valid,
					value: this.value,
					msg: undefined,
				});
			}

			if (!isBlur) {
				this.field?.setSelectionRange(this.field?.value.length, this.field?.value.length);
				this.field?.focus();
			}

			return this.valid;
		}

		return true;
	}

	blur() {
		this.validate(true);
	}

	focus() {
		this.field?.focus();
	}

	input(e: Event) {
		this.value = (e.target as HTMLInputElement).value;
		if (!this.valid) {
			this.validate();
		}
	}

	componentDidMount() {
		this.field = this.getContent()?.getElementsByTagName('input')[0];
		if (this.field) {
			this.field.addEventListener('input', this.input);
			// This.field.addEventListener('focus', this.focus);
			this.field.addEventListener('blur', this.blur);
		}
	}

	render() {
		const file = readFileSync(__dirname + '/styled-input.pug', 'utf8');
		const html = pug.render(file, {...this.props, valid: this.valid});
		return html;
	}
}