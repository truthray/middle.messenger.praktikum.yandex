import './new-message-area.scss';
import * as pug from 'pug';
import {readFileSync} from 'fs';
import Block from '../../common/block';
import StyledControlBtn from '../base/styled-control-btn/styled-control-btn';
import StyledBtn from '../base/styled-btn/styled-btn';
import MessageInput from '../base/message-input/message-input';

export default class NewMessageArea extends Block {
	constructor(props: any) {
		super('div', {
			...props,
			addFileBtn: new StyledControlBtn({label: '+', events: {click: () => {
				document.getElementById('file_input')?.click();
			}}}),
			sendBtn: new StyledBtn({label: 'Отправить', type: 'submit'}),
			messageInput: new MessageInput({value: ''}),
		});
		this.sendMessage = this.sendMessage.bind(this);

		(this.props.sendBtn as Block).setProps({...(this.props.sendBtn as Block).props, events: {click: this.sendMessage}});
	}

	sendMessage(e: Event) {
		e.preventDefault();
		const value = (this.props.messageInput as MessageInput).getValue();
		if (value && this.props.sendMessage) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			this.props.sendMessage(value);
			(this.props.messageInput as MessageInput).setProps({...(this.props.messageInput as Block).props, value: ''});
		}
	}

	render() {
		const file = readFileSync(__dirname + '/new-message-area.pug', 'utf8');
		const html = pug.render(file, {
			...this.props,
			addFileBtn: (this.props.addFileBtn as Block).blockWithId(),
			sendBtn: (this.props.sendBtn as Block).blockWithId(),
			messageInput: (this.props.messageInput as Block).blockWithId(),
		});

		return html;
	}
}
