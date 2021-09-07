import HTTPTransport from '../api-client/fetch';

export interface CrudInterface {
	list: () => Promise<unknown>;
	get: (id: number) => Promise<unknown>;
	create: (dto: any) => Promise<unknown>;
	update: (id: number, dto: any) => Promise<unknown>;
	delete: (id: number) => Promise<unknown>;
}

export function crudFactory(client: HTTPTransport): CrudInterface {
	return {
		list: async () => client.get(''),
		get: async (id: number) => client.get(`${id}`),
		create: async (dto: unknown) => client.post('', {data: dto}),
		update: async (id: number, dto: unknown) => client.put(`${id}`, {data: dto}),
		delete: async (id: number) => client.delete(`${id}`),
	};
}
