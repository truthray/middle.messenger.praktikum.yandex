import {UserDto} from './user';
export interface Chat {
	id: number;
	title: string;
	avatar: string;
	unread_count: number;
}

export interface Message {
	user: UserDto;
	time: string;
	content: string;
}
