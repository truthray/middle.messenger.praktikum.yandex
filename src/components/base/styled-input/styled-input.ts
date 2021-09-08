import Block from '../../../common/block';
import * as pug from 'pug';
import {Rule} from '../../../utils/rules';
import pages from '../../../pages';

export default class StyledInput extends Block {
	public valid = true;
	private field: HTMLInputElement | undefined;

	constructor(props: any) {
		super('div', {...props});

		this.focus = this.focus.bind(this);
		this.blur = this.blur.bind(this);
		this.input = this.input.bind(this);
		this.validate = this.validate.bind(this);
	}

	get value() {
		return (this.props.value as string);
	}

	validate(blur = false): boolean {
		if (this.props.rules && Array.isArray(this.props.rules)) {
			const error = (this.props.rules as Rule[]).find((rule: {rule: RegExp; msg: string}) => !rule.rule.test(this.props.value));
			const currentPos = this.field?.selectionStart;

			if (error) {
				this.valid = false;
				this.setProps({
					...this.props,
					valid: this.valid,
					value: (this.props.value as string) || '',
					msg: error.msg,
				});
			} else {
				this.valid = true;
				this.setProps({
					...this.props,
					valid: this.valid,
					value: (this.props.value as string) || '',
					msg: undefined,
				});
			}

			if (currentPos && !blur) {
				this.field?.setSelectionRange(currentPos, currentPos);
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
		this.props.value = (e.target as HTMLInputElement).value;
		if (!this.valid) {
			this.validate();
		}
	}

	componentDidMount() {
		this.field = this.getContent()?.getElementsByTagName('input')[0];
		if (this.field) {
			this.field.addEventListener('input', this.input);
			this.field.addEventListener('blur', this.blur);
		}
	}

	render() {
		const html = pug.render(pages.styledInput, {...this.props, valid: this.valid});
		return html;
	}
}
