import './chat-area.scss';
import * as pug from 'pug';
import {readFileSync} from 'fs';
import Block from '../../common/block';
import Avatar from '../base/avatar/avatar';
import MessageArea from '../base/message/message';
import NewMessageArea from '../new-message-area/new-message-area';

export default class ChatArea extends Block {
	constructor(props: any) {
		super('div', {
			...props,
			avatar: new Avatar({}),
			newMessageArea: new NewMessageArea({}),
		});

		if (this.props.messages && Array.isArray(this.props.messages)) {
			const messageAreas = this.props.messages.map((x: string) => new MessageArea({message: x}));
			this.setProps({...this.props, messageAreas});
		}
	}

	render() {
		const file = readFileSync(__dirname + '/chat-area.pug', 'utf8');
		const html = pug.render(file, {
			...this.props,
			avatar: (this.props.avatar as Block).blockWithId(),
			newMessageArea: (this.props.newMessageArea as Block).blockWithId(),
			messageAreas: (this.props.messageAreas as Block[]).map((x: Block) => x.blockWithId()),
		});

		return html;
	}
}
