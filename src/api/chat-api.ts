import HTTPTransport from '../api-client/fetch';

const client = new HTTPTransport('/chats');

export const ChatApi = {
	chats: async () => client.get(''),
	create: async (title: string) => client.post('', {data: {title}}),
	delete: async (chatId: number) => client.delete('', {data: {chatId}}),
	users: async (chatId: number) => client.get(`/${chatId}/users`),
	getToken: async (id: number) => client.post(`/token/${id}`),
	addUser: async (chatId: number, userId: number) => client.put('/users', {data: {chatId, users: [userId]}}),
	deleteUser: async (chatId: number, userId: number) => client.delete('/users', {data: {chatId, users: [userId]}}),
	updateAvatar: async (avatar: FormData) => client.put('/avatar', {data: avatar}),
};
