import './new-message-area.scss';
import * as pug from 'pug';
import Block from '../../common/block';
import StyledControlBtn from '../base/styled-control-btn/styled-control-btn';
import StyledBtn from '../base/styled-btn/styled-btn';
import MessageInput from '../base/message-input/message-input';
import pages from '../../pages';

export default class NewMessageArea extends Block {
	private readonly addFileBtn = new StyledControlBtn({label: '+', events: {click: () => {
		document.getElementById('file_input')?.click();
	}}});

	private readonly sendBtn = new StyledBtn({label: 'Отправить', type: 'submit'});
	private readonly messageInput = new MessageInput({value: ''});

	constructor(props: any) {
		super('div', {
			...props,
		});

		this.setProps({...this.props, addFileBtn: this.addFileBtn, sendBtn: this.sendBtn, messageInput: this.messageInput});
		this.sendMessage = this.sendMessage.bind(this);

		this.sendBtn.setProps({...this.sendBtn.props, events: {click: this.sendMessage}});
	}

	sendMessage(e: Event) {
		e.preventDefault();
		const value = this.messageInput.getValue();
		if (value && this.props.sendMessage) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			this.props.sendMessage(value);
			this.messageInput.setProps({...this.messageInput.props, value: ''});
		}
	}

	render() {
		const html = pug.render(pages.newMessageArea, {
			...this.props,
			addFileBtn: this.addFileBtn.blockWithId(),
			sendBtn: this.sendBtn.blockWithId(),
			messageInput: this.messageInput.blockWithId(),
		});

		return html;
	}
}
