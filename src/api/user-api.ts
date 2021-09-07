import {EditUserDto} from './../models/user';
import HTTPTransport from '../api-client/fetch';

const client = new HTTPTransport('/user');

export const UserApi = {
	update: async (dto: EditUserDto) => client.put('/profile', {data: dto}),
	updatePassword: async (pwd: unknown) => client.put('/password', {data: pwd}),
	updateAvatar: async (avatar: FormData) => client.put('/profile/avatar', {data: avatar}),
	search: async (login: string) => client.post('/search', {data: {login}}),
};
