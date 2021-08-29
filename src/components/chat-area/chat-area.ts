import {UserApi} from './../../api/user-api';
import {UserDto} from './../../models/user';
import {ChatApi} from './../../api/chat-api';
import './chat-area.scss';
import * as pug from 'pug';
import {readFileSync} from 'fs';
import Block from '../../common/block';
import Avatar from '../base/avatar/avatar';
import MessageArea from '../base/message/message';
import NewMessageArea from '../new-message-area/new-message-area';
import StyledControlBtn from '../base/styled-control-btn/styled-control-btn';
import StyledInput from '../base/styled-input/styled-input';

export default class ChatArea extends Block {
	constructor() {
		super('div', {
			users: [],
			messages: [],
			currentDate: '',
			avatar: new Avatar({}),
			newMessageArea: new NewMessageArea({}),
			plusBtn: new StyledControlBtn({label: '+'}),
			minusBtn: new StyledControlBtn({label: '-'}),
			loginInput: new StyledInput({label: 'Логин'}),
			messageAreas: [],
		});

		this.plusClickHandler = this.plusClickHandler.bind(this);
		this.minusClickHandler = this.minusClickHandler.bind(this);

		(this.props.plusBtn as Block).setProps({...(this.props.plusBtn as Block).props, events: {click: this.plusClickHandler}});
		(this.props.minusBtn as Block).setProps({...(this.props.minusBtn as Block).props, events: {click: this.minusClickHandler}});
		(this.props.newMessageArea as Block).setProps({...(this.props.newMessageArea as Block).props, sendMessage: this.props.sendMessage as any[]});

		this.fetchUsers = this.fetchUsers.bind(this);
		this.fetchUsers();
	}

	componentDidUpdate() {
		if (Array.isArray(this.props.messages) && Array.isArray(this.props.messageAreas)) {
			if (this.props.messages.length !== this.props.messageAreas.length) {
				const messageAreas = this.props.messages.map((x: string) => new MessageArea({message: x, userId: this.props.userId as number}));
				this.setProps({...this.props, messageAreas});

				const element = document.getElementById('scrollmessages');
				element?.scrollTo(0, 200);
			}
		}

		(this.props.newMessageArea as Block).setProps({...(this.props.newMessageArea as Block).props, sendMessage: this.props.sendMessage as any[]});
		return true;
	}

	plusClickHandler() {
		UserApi.search((this.props.loginInput as StyledInput).value).then(response => {
			if ((response as XMLHttpRequest).status === 200) {
				const user = JSON.parse((response as XMLHttpRequest).response) as UserDto[];
				if (user[0]) {
					ChatApi.addUser(this.props.active, user[0].id).then(() => {
						(this.props.loginInput as StyledInput).setProps({...(this.props.loginInput as StyledInput).props, value: ''});
						this.fetchUsers();
					}).catch(e => {
						console.log(e);
					});
				}
			}
		}).catch(e => {
			console.log(e);
		});
	}

	minusClickHandler() {
		UserApi.search((this.props.loginInput as StyledInput).value).then(response => {
			if ((response as XMLHttpRequest).status === 200) {
				const user = JSON.parse((response as XMLHttpRequest).response) as UserDto[];
				if (user[0]) {
					ChatApi.deleteUser(this.props.active, user[0].id).then(() => {
						(this.props.loginInput as StyledInput).setProps({...(this.props.loginInput as StyledInput).props, value: ''});
						this.fetchUsers();
					}).catch(e => {
						console.log(e);
					});
				}
			}
		}).catch(e => {
			console.log(e);
		});
	}

	fetchUsers() {
		if (this.props.active) {
			ChatApi.users(this.props.active).then(response => {
				if ((response as XMLHttpRequest).status === 200) {
					const users = JSON.parse((response as XMLHttpRequest).response) as UserDto[];
					this.setProps({
						...this.props,
						users,
					});
				}
			}).catch(e => {
				console.log(e);
			});
		}
	}

	render() {
		const file = readFileSync(__dirname + '/chat-area.pug', 'utf8');
		const html = pug.render(file, {
			...this.props,
			avatar: (this.props.avatar as Block).blockWithId(),
			newMessageArea: (this.props.newMessageArea as Block).blockWithId(),
			plusBtn: (this.props.plusBtn as Block).blockWithId(),
			minusBtn: (this.props.minusBtn as Block).blockWithId(),
			loginInput: (this.props.loginInput as Block).blockWithId(),
			messageAreas: (this.props.messageAreas as Block[]).map((x: Block) => x.blockWithId()),
		});

		return html;
	}
}
