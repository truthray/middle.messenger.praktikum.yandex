import {NewUserDto, UserInfo} from '../models/user';
import HTTPTransport from '../api-client/fetch';

const client = new HTTPTransport('/auth');

export const AuthApi = {
	signup: async (dto: NewUserDto) => client.post('/signup', {data: dto}),
	signin: async (dto: UserInfo) => client.post('/signin', {data: dto}),
	logout: async () => client.post('/logout'),
	user: async () => client.get('/user'),
};
