import {UserApi} from './../../api/user-api';
import {UserDto} from './../../models/user';
import {ChatApi} from './../../api/chat-api';
import './chat-area.scss';
import * as pug from 'pug';
import Block from '../../common/block';
import Avatar from '../base/avatar/avatar';
import MessageArea from '../base/message/message';
import NewMessageArea from '../new-message-area/new-message-area';
import StyledControlBtn from '../base/styled-control-btn/styled-control-btn';
import StyledInput from '../base/styled-input/styled-input';
import pages from '../../pages';

export default class ChatArea extends Block {
	private readonly avatar = new Avatar({});
	private readonly newMessageArea = new NewMessageArea({});
	private readonly plusBtn = new StyledControlBtn({label: '+'});
	private readonly minusBtn = new StyledControlBtn({label: '-'});
	private readonly loginInput = new StyledInput({label: 'Логин'});
	private messageAreas: MessageArea[] = [];

	constructor() {
		super('div', {
			users: [],
			messages: [],
			currentDate: '',
		});

		this.setProps({...this.props, avatar: this.avatar, newMessageArea: this.newMessageArea, plusBtn: this.plusBtn, minusBtn: this.minusBtn, loginInput: this.loginInput, messageAreas: this.messageAreas});

		this.plusClickHandler = this.plusClickHandler.bind(this);
		this.minusClickHandler = this.minusClickHandler.bind(this);

		this.plusBtn.setProps({...this.plusBtn.props, events: {click: this.plusClickHandler}});
		this.minusBtn.setProps({...this.minusBtn.props, events: {click: this.minusClickHandler}});
		this.newMessageArea.setProps({...this.newMessageArea.props, sendMessage: this.props.sendMessage as any[]});

		this.fetchUsers = this.fetchUsers.bind(this);
		this.fetchUsers();
	}

	componentDidUpdate() {
		if (Array.isArray(this.props.messages) && Array.isArray(this.props.messageAreas)) {
			if (this.props.messages.length !== this.props.messageAreas.length) {
				this.messageAreas = this.props.messages.map((x: string) => new MessageArea({message: x, userId: this.props.userId as number}));
				this.setProps({...this.props, messageAreas: this.messageAreas});

				const element = document.getElementById('scrollmessages');
				element?.scrollTo(0, 200);
			}
		}

		this.newMessageArea.setProps({...this.newMessageArea.props, sendMessage: this.props.sendMessage as any[]});
		return true;
	}

	plusClickHandler() {
		UserApi.search(this.loginInput.value).then(response => {
			if (response.status === 200) {
				const user = JSON.parse(response.response) as UserDto[];
				if (user[0]) {
					return ChatApi.addUser(this.props.active, user[0].id);
				}
			}
		}).then(() => {
			this.loginInput.setProps({...this.loginInput.props, value: ''});
			this.fetchUsers();
		}).catch(e => {
			console.log(e);
		});
	}

	minusClickHandler() {
		UserApi.search(this.loginInput.value).then(response => {
			if ((response).status === 200) {
				const user = JSON.parse(response.response) as UserDto[];
				if (user[0]) {
					ChatApi.deleteUser(this.props.active, user[0].id).then(() => {
						this.loginInput.setProps({...this.loginInput.props, value: ''});
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
				if ((response).status === 200) {
					const users = JSON.parse(response.response) as UserDto[];
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
		// Const file = readFileSync(__dirname + '/chat-area.pug', 'utf8');
		const html = pug.render(pages.chatArea, {
			...this.props,
			avatar: this.avatar.blockWithId(),
			newMessageArea: this.newMessageArea.blockWithId(),
			plusBtn: this.plusBtn.blockWithId(),
			minusBtn: this.minusBtn.blockWithId(),
			loginInput: this.loginInput.blockWithId(),
			messageAreas: this.messageAreas.map((x: Block) => x.blockWithId()),
		});

		return html;
	}
}
