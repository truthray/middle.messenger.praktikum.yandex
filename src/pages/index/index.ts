import {UserDto} from './../../models/user';
import {AuthApi} from './../../api/auth-api';
import {Chat} from './../../models/chat';
import {ChatApi} from './../../api/chat-api';
import {person} from './../../data';
import * as pug from 'pug';
import Block from '../../common/block';
import './index.scss';
import {readFileSync} from 'fs';
import ChatPerson from '../../components/chat-person/chat-person';
import StyledControlBtn from '../../components/base/styled-control-btn/styled-control-btn';
import StyledInput from '../../components/base/styled-input/styled-input';
import ChatArea from '../../components/chat-area/chat-area';
import ProfileArea from '../../components/profile/profile';
import {useRouter} from '../../common/router';
import {useWebSocket} from '../../api-client/websocket';

export default class IndexPage extends Block {
	private active = 0;
	private socket: WebSocket | undefined = undefined;
	constructor() {
		super('div', {
			chats: [],
			person,
			messages: [],

			chatPerson: new ChatPerson({chat: {
				id: 0,
				title: 'Профиль',
				avatar: 'https://w7.pngwing.com/pngs/841/727/png-transparent-computer-icons-user-profile-synonyms-and-antonyms-android-android-computer-wallpaper-monochrome-sphere.png',
			}, events: {click: (e: Event) => {
				this.changeActive(e);
			}}}),
			minusBtn: new StyledControlBtn({label: '-'}),
			plusBtn: new StyledControlBtn({label: '+'}),
			titleInput: new StyledInput({label: 'Название чата'}),
			chatArea: new ChatArea(),
			chatPersons: [],
			profile: new ProfileArea(),
		});
		this.sendMessage = this.sendMessage.bind(this);
		this.onMessage = this.onMessage.bind(this);
		this.onOpen = this.onOpen.bind(this);
		this.plusClickHandler = this.plusClickHandler.bind(this);
		this.minusClickHandler = this.minusClickHandler.bind(this);
		(this.props.plusBtn as Block).setProps({...(this.props.plusBtn as Block).props, events: {click: this.plusClickHandler}});
		(this.props.minusBtn as Block).setProps({...(this.props.minusBtn as Block).props, events: {click: this.minusClickHandler}});
		(this.props.chatPerson as Block).setProps({...(this.props.chatPerson as Block).props, active: this.active});
		(this.props.chatArea as Block).setProps({...(this.props.chatArea as Block).props, sendMessage: this.sendMessage});
		(this.props.chatPersons as Block[]).forEach((x: Block) => {
			x.setProps({...x.props, active: this.active});
		});
		this.changeActive = this.changeActive.bind(this);
		this.setProps({...this.props, changeActive: this.changeActive, active: this.active});
	}

	componentDidMount() {
		this.fetchChats();
		this.fetchUser();
	}

	fetchUser() {
		AuthApi.user().then(user => {
			if ((user as XMLHttpRequest).status === 200) {
				const parsed = JSON.parse((user as XMLHttpRequest).response) as UserDto;
				(this.props.profile as Block).setProps({...(this.props.profile as Block).props, user: parsed});
				(this.props.chatArea as Block).setProps({...(this.props.chatArea as Block).props, userId: parsed.id});

				(this.props.chatPerson as Block).setProps({...(this.props.chatPerson as Block).props, chat: {
					id: 0,
					title: 'Профиль',
					avatar: parsed.avatar,
				}});

				this.props.userId = parsed.id;
			} else if ((user as XMLHttpRequest).status === 401) {
				useRouter()?.go('/');
			}
		}).catch(e => {
			console.log('error: ', e);
		});
	}

	sendMessage(msg: string) {
		this.socket?.send(JSON.stringify({
			content: msg,
			type: 'message',
		}));
	}

	onMessage(e: {data: string}) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const message = JSON.parse(e.data);

		if (Array.isArray(this.props.messages)) {
			if (Array.isArray(message)) {
				this.props.messages = message;
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			} else if (message.type === 'message') {
				this.props.messages.unshift(message);
			}
		}

		(this.props.chatArea as Block).setProps({...(this.props.chatArea as Block).props, messages: this.props.messages as any[]});
	}

	onOpen() {
		this.socket?.send(JSON.stringify({
			content: '0',
			type: 'get old',
		}));
	}

	createSocket() {
		ChatApi.getToken(this.props.active)
			.then(response => {
				const token = JSON.parse((response as XMLHttpRequest).response) as {token: string};
				if (token && this.props.userId && this.props.active > 1) {
					this.socket?.close();
					this.socket = useWebSocket(this.props.active, this.props.userId, token.token, this.onOpen, this.onMessage);
				}
			})
			.catch(e => {
				console.log(e);
			});
		return true;
	}

	fetchChats() {
		ChatApi.chats().then(response => {
			if ((response as XMLHttpRequest).status === 200) {
				const chats = JSON.parse((response as XMLHttpRequest).response) as Chat[];
				if (chats.length !== this.props.chatPersons.length) {
					this.setProps({
						...this.props,
						chats,
						chatPersons: chats.map(chat => new ChatPerson({
							chat,
							active: this.active,
							events: {
								click: (e: Event) => {
									this.changeActive(e);
								},
							},
						})),
					});
				}
			}
		}).catch(e => {
			console.log(e);
		});
	}

	changeActive(e: Event) {
		this.props.messages = [];
		this.active = Number((e.target as HTMLElement).id || 1);
		(this.props.chatPerson as Block).setProps({...(this.props.chatPerson as Block).props, active: this.active});
		(this.props.chatPersons as Block[]).forEach((x: Block) => {
			x.setProps({...x.props, active: this.active});
		});
		(this.props.chatArea as Block).setProps({...(this.props.chatArea as Block).props, active: this.active, messages: []});
		(this.props.chatArea as ChatArea).fetchUsers();
		this.setProps({...this.props, active: this.active});
		this.createSocket();
	}

	plusClickHandler() {
		ChatApi.create((this.props.titleInput as StyledInput).value).then(() => {
			(this.props.titleInput as StyledInput).setProps({...(this.props.titleInput as Block).props, value: ''});
			this.fetchChats();
		}).catch(e => {
			console.log(e);
		});
	}

	minusClickHandler() {
		(this.props.titleInput as StyledInput).setProps({...(this.props.titleInput as Block).props, value: ''});
	}

	render() {
		const file = readFileSync(__dirname + '/index.pug', 'utf8');
		const html = pug.render(file, {
			...this.props,
			chatPerson: (this.props.chatPerson as Block).blockWithId(),
			minusBtn: (this.props.minusBtn as Block).blockWithId(),
			plusBtn: (this.props.plusBtn as Block).blockWithId(),
			titleInput: (this.props.titleInput as Block).blockWithId(),
			chatArea: (this.props.chatArea as Block).blockWithId(),
			chatPersons: (this.props.chatPersons as Block[]).map((x: Block) => x.blockWithId()),
			profile: (this.props.profile as Block).blockWithId(),
		});

		return html;
	}
}
