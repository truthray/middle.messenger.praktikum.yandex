import './chat-area.scss';
import * as pug from 'pug';
import {readFileSync} from 'fs';
import Block from '../../common/block';
import Avatar from '../base/avatar/avatar';
import StyledControlBtn from '../base/styled-control-btn/styled-control-btn';
import StyledBtn from '../base/styled-btn/styled-btn';
import MessageArea from '../base/message/message';
import MessageInput from '../base/message-input/message-input';

export default class ChatArea extends Block {
	constructor(props: any) {
		super('div', {
			...props,
			addFileBtn: new StyledControlBtn({label: '+', events: {click: () => {
				document.getElementById('file_input')?.click();
			}}}),
			sendBtn: new StyledBtn({label: 'Отправить'}),
			avatar: new Avatar({}),
			messageInput: new MessageInput({}),
		});
		this.sendMessage = this.sendMessage.bind(this);

		(this.props.sendBtn as Block).setProps({...(this.props.sendBtn as Block).props, events: {click: this.sendMessage}});

		if (this.props.messages && Array.isArray(this.props.messages)) {
			const messageAreas = this.props.messages.map((x: string) => new MessageArea({message: x}));
			this.setProps({...this.props, messageAreas});
		}
	}

	sendMessage() {
		console.log('Сообщение: ', (this.props.messageInput as MessageInput).getValue());
		(this.props.messageInput as MessageInput).setProps({...(this.props.messageInput as Block).props, value: ''});
	}

	render() {
		const file = readFileSync(__dirname + '/chat-area.pug', 'utf8');
		const html = pug.render(file, {
			...this.props,
			addFileBtn: (this.props.addFileBtn as Block).blockWithId(),
			sendBtn: (this.props.sendBtn as Block).blockWithId(),
			avatar: (this.props.avatar as Block).blockWithId(),
			messageInput: (this.props.messageInput as Block).blockWithId(),
			messageAreas: (this.props.messageAreas as Block[]).map((x: Block) => x.blockWithId()),
		});

		return html;
	}
}
