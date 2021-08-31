import {ChatApi} from './../../api/chat-api';
import {Chat} from './../../models/chat';
import './chat-person.scss';
import * as pug from 'pug';
import {readFileSync} from 'fs';
import Block from '../../common/block';
import Avatar from '../base/avatar/avatar';
import StyledControlBtn from '../base/styled-control-btn/styled-control-btn';
import {toBase64} from '../../utils/toBase64';

export default class ChatPerson extends Block {
	constructor(props: any) {
		super('div', {
			...props,
			avatar: new Avatar({events: {click: () => {
				const avatarInput = document.getElementById('avatar_input');
				avatarInput?.removeEventListener('input', this.avatarHandler);
				avatarInput?.addEventListener('input', this.avatarHandler);
				avatarInput?.click();
			}}}),
			plusBtn: new StyledControlBtn({label: '+'}),
			unreadBtn: new StyledControlBtn({}),
		});
		this.avatarHandler = this.avatarHandler.bind(this);
		// (this.props.avatar as Block).setProps({...(this.props.avatar as Block).props, url: `https://ya-praktikum.tech/api/v2/resources/${(this.props.chat as Chat).avatar}`});
		(this.props.unreadBtn as Block).setProps({...(this.props.unreadBtn as Block).props, label: (this.props.chat as Chat)?.unread_count});
	}

	componentDidMount() {
		if (this.props.chat) {
			const chat = this.props.chat as Chat;
			if (chat.avatar) {
				(this.props.avatar as Block).setProps({...(this.props.avatar as Block).props, url: `https://ya-praktikum.tech/api/v2/resources/${chat.avatar}`});
			}
		}
	}

	async avatarHandler(e: Event) {
		const target = (e.target as HTMLInputElement);
		if (!target) {
			return;
		}

		if (target.files && target.files.length > 0) {
			const file = target.files[0];
			if (file) {
				const avatar = await (toBase64(file));
				const formData = new FormData();
				formData.append('avatar', file);
				formData.append('chatId', (this.props.chat as Chat).id.toString());
				(this.props.avatar as Block).setProps({...(this.props.avatar as Block).props, url: avatar});
				ChatApi.updateAvatar(formData).catch(e => {
					console.log(e);
				});
			}
		}
	}

	render() {
		const file = readFileSync(__dirname + '/chat-person.pug', 'utf8');
		const html = pug.render(file, {
			...this.props,
			avatar: (this.props.avatar as Block).blockWithId(),
			plusBtn: (this.props.plusBtn as Block).blockWithId(),
			unreadBtn: (this.props.unreadBtn as Block).blockWithId(),
		});
		return html;
	}
}
