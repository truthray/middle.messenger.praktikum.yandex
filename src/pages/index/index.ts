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
import {useWebSocket} from '../../api-client/websocket';
import {useRouter} from '../../common/router';

export default class IndexPage extends Block {
	private active = 0;
	private socket: WebSocket | undefined = undefined;

	private readonly chatPerson = new ChatPerson({
		chat: {
			id: 0,
			title: 'Профиль',
			avatar: '',
		},
		events: {click: (e: Event) => {
			this.changeActive(Number((e.target as HTMLElement).id || 1));
		}},
	});

	private readonly minusBtn = new StyledControlBtn({label: '-'});
	private readonly plusBtn = new StyledControlBtn({label: '+'});
	private readonly titleInput = new StyledInput({label: 'Название чата'});
	private readonly chatArea = new ChatArea();
	private chatPersons: ChatPerson[] = [];
	private readonly profile = new ProfileArea(this.fetchUser);

	constructor() {
		super('div', {
			chats: [],
			person,
			messages: [],
		});
		this.setProps({
			...this.props,
			chatPerson: this.chatPerson,
			minusBtn: this.minusBtn,
			plusBtn: this.plusBtn,
			titleInput: this.titleInput,
			chatArea: this.chatArea,
			chatPersons: this.chatPersons,
			profile: this.profile,
		});

		this.sendMessage = this.sendMessage.bind(this);
		this.onMessage = this.onMessage.bind(this);
		this.onOpen = this.onOpen.bind(this);
		this.fetchUser = this.fetchUser.bind(this);
		this.plusClickHandler = this.plusClickHandler.bind(this);
		this.minusClickHandler = this.minusClickHandler.bind(this);
		this.plusBtn.setProps({...this.plusBtn.props, events: {click: this.plusClickHandler}});
		this.minusBtn.setProps({...this.minusBtn.props, events: {click: this.minusClickHandler}});
		this.chatPerson.setProps({...this.chatPerson.props, active: this.active});
		this.chatArea.setProps({...this.chatArea.props, sendMessage: this.sendMessage});
		this.chatPersons.forEach((x: Block) => {
			x.setProps({...x.props, active: this.active});
		});
		this.changeActive = this.changeActive.bind(this);

		const queryParams = useRouter()?.queryParams;
		if (queryParams?.id) {
			this.setActive(Number(queryParams?.id));
		} else {
			this.setProps({...this.props, changeActive: this.changeActive, active: this.active});
		}
	}

	componentDidMount() {
		this.fetchChats();
		this.fetchUser();
	}

	fetchUser() {
		AuthApi.user().then(user => {
			if (user.status === 200) {
				const parsed = JSON.parse(user.response) as UserDto;
				this.profile.setProps({...this.profile.props, user: parsed});
				this.chatArea.setProps({...this.chatArea.props, userId: parsed.id});

				this.chatPerson.setProps({...this.chatPerson.props, chat: {
					id: 0,
					title: 'Профиль',
					avatar: parsed.avatar,
				}});

				this.props.userId = parsed.id;
			}
			// Else if ((user as XMLHttpRequest).status === 401) {
			// useRouter()?.go('/');
			// }
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

		this.chatArea.setProps({...this.chatArea.props, messages: this.props.messages as any[]});
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
				const token = JSON.parse(response.response) as {token: string};
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
			if (response.status === 200) {
				const chats = JSON.parse(response.response) as Chat[];
				if (chats.length !== (this.props.chatPersons as any[]).length) {
					this.chatPersons = chats.map(chat => new ChatPerson({
						chat,
						active: this.active,
						events: {
							click: (e: Event) => {
								this.changeActive(Number((e.target as HTMLElement).id || 1));
							},
						},
					}));

					this.setProps({
						...this.props,
						chats,
						chatPersons: this.chatPersons,
					});
				}
			}
		}).catch(e => {
			console.log(e);
		});
	}

	changeActive(id: number) {
		useRouter()?.go('/messenger', {id});
		this.setActive(id);
	}

	setActive(id: number) {
		this.props.messages = [];
		this.active = id;
		this.chatPerson.setProps({...this.chatPerson.props, active: this.active});
		this.chatPersons.forEach((x: Block) => {
			x.setProps({...x.props, active: this.active});
		});
		this.chatArea.setProps({...this.chatArea.props, active: this.active, messages: []});
		this.chatArea.fetchUsers();
		this.setProps({...this.props, active: this.active});
		this.createSocket();
	}

	plusClickHandler() {
		ChatApi.create(this.titleInput.value).then(() => {
			this.titleInput.setProps({...this.titleInput.props, value: ''});
			this.fetchChats();
		}).catch(e => {
			console.log(e);
		});
	}

	minusClickHandler() {
		this.titleInput.setProps({...this.titleInput.props, value: ''});
	}

	render() {
		const file = readFileSync(__dirname + '/index.pug', 'utf8');
		const html = pug.render(file, {
			...this.props,
			chatPerson: this.chatPerson.blockWithId(),
			minusBtn: this.minusBtn.blockWithId(),
			plusBtn: this.plusBtn.blockWithId(),
			titleInput: this.titleInput.blockWithId(),
			chatArea: this.chatArea.blockWithId(),
			chatPersons: this.chatPersons.map((x: Block) => x.blockWithId()),
			profile: this.profile.blockWithId(),
		});

		return html;
	}
}
