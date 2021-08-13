import {messages, persons, person} from './../../data';
import * as pug from 'pug';
import Block from '../../common/block';
import './index.scss';
import {readFileSync} from 'fs';
import ChatPerson from '../../components/chat-person/chat-person';
import StyledControlBtn from '../../components/base/styled-control-btn/styled-control-btn';
import StyledInput from '../../components/base/styled-input/styled-input';
import ChatArea from '../../components/chat-area/chat-area';
import ProfileArea from '../../components/profile/profile';

export default class IndexPage extends Block {
	private active = 1;

	constructor() {
		super('div', {
			messages,
			persons,
			person,

			chatPerson: new ChatPerson({person, events: {click: (e: Event) => {
				this.changeActive(e);
			}}}),
			minusBtn: new StyledControlBtn({label: '-'}),
			plusBtn: new StyledControlBtn({label: '+'}),
			loginInput: new StyledInput({label: 'Логин'}),
			chatArea: new ChatArea({messages}),
			chatPersons: persons.map(x => new ChatPerson({person: x, events: {click: (e: Event) => {
				this.changeActive(e);
			}}})),
			profile: new ProfileArea({person}),
		});
		this.plusClickHandler = this.plusClickHandler.bind(this);
		this.minusClickHandler = this.minusClickHandler.bind(this);
		(this.props.plusBtn as Block).setProps({...(this.props.plusBtn as Block).props, events: {click: this.plusClickHandler}});
		(this.props.minusBtn as Block).setProps({...(this.props.minusBtn as Block).props, events: {click: this.minusClickHandler}});
		(this.props.chatPerson as Block).setProps({...(this.props.chatPerson as Block).props, active: this.active});
		(this.props.chatPersons as Block[]).forEach((x: Block) => {
			x.setProps({...x.props, active: this.active});
		});
		this.changeActive = this.changeActive.bind(this);
		this.setProps({...this.props, changeActive: this.changeActive, active: this.active});
	}

	changeActive(e: Event) {
		this.active = Number((e.target as HTMLElement).id || 1);
		(this.props.chatPerson as Block).setProps({...(this.props.chatPerson as Block).props, active: this.active});
		(this.props.chatPersons as Block[]).forEach((x: Block) => {
			x.setProps({...x.props, active: this.active});
		});
		this.setProps({...this.props, active: this.active});
	}

	plusClickHandler() {
		console.log('Логин: ', (this.props.loginInput as StyledInput).value);
		(this.props.loginInput as StyledInput).setProps({...(this.props.loginInput as Block).props, value: ''});
	}

	minusClickHandler() {
		console.log('Логин: ', (this.props.loginInput as StyledInput).value);
		(this.props.loginInput as StyledInput).setProps({...(this.props.loginInput as Block).props, value: ''});
	}

	render() {
		const file = readFileSync(__dirname + '/index.pug', 'utf8');

		const html = pug.render(file, {
			...this.props,
			chatPerson: (this.props.chatPerson as Block).blockWithId(),
			minusBtn: (this.props.minusBtn as Block).blockWithId(),
			plusBtn: (this.props.plusBtn as Block).blockWithId(),
			loginInput: (this.props.loginInput as Block).blockWithId(),
			chatArea: (this.props.chatArea as Block).blockWithId(),
			chatPersons: (this.props.chatPersons as Block[]).map((x: Block) => x.blockWithId()),
			profile: (this.props.profile as Block).blockWithId(),
		});

		return html;
	}
}
