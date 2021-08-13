import './chat-person.scss';
import * as pug from 'pug';
import {readFileSync} from 'fs';
import Block from '../../common/block';
import Avatar from '../base/avatar/avatar';
import StyledControlBtn from '../base/styled-control-btn/styled-control-btn';
import {Person} from '../../models/person';

export default class ChatPerson extends Block {
	constructor(props: any) {
		super('div', {
			...props,
			avatar: new Avatar({}),
			plusBtn: new StyledControlBtn({label: '+'}),
			unreadBtn: new StyledControlBtn({}),
		});
		(this.props.avatar as Block).setProps({...(this.props.avatar as Block).props, url: (this.props.person as Person).avatar});
		(this.props.unreadBtn as Block).setProps({...(this.props.unreadBtn as Block).props, label: (this.props.person as Person)?.unread});
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
