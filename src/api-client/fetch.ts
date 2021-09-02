enum METHODS {
	GET = 'GET',
	PUT = 'PUT',
	POST = 'POST',
	DELETE = 'DELETE',
}

type PlainObject<T = unknown> = {
	[k in string]: T;
};

function isPlainObject(value: unknown): value is PlainObject {
	return typeof value === 'object'
        && value !== null
        && value.constructor === Object
        && Object.prototype.toString.call(value) === '[object Object]';
}

function isArray(value: unknown): value is any[] {
	return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is any[] | PlainObject {
	return isPlainObject(value) || isArray(value);
}

function getKey(key: string, parentKey?: string) {
	return parentKey ? `${parentKey}[${key}]` : key;
}

function getParams(data: PlainObject | any[], parentKey?: string) {
	const result: Array<[string, string]> = [];

	for (const [key, value] of Object.entries(data)) {
		if (isArrayOrObject(value)) {
			result.push(...getParams(value, getKey(key, parentKey)));
		} else {
			result.push([getKey(key, parentKey), encodeURIComponent(String(value))]);
		}
	}

	return result;
}

export function queryString(data: PlainObject) {
	if (!isPlainObject(data)) {
		throw new Error('input must be an object');
	}

	return getParams(data).map(arr => arr.join('=')).join('&');
}

export default class HTTPTransport {
	private readonly baseUrl: string;

	constructor(url: string) {
		this.baseUrl = 'https://ya-praktikum.tech/api/v2' + url;
	}

	get url() {
		return this.baseUrl;
	}

	get = async (url: string, options: Record<string, any> = {}) => {
		url = options.data ? `${url}?${queryString(options.data)}` : url;
		options.data = undefined;
		return this.request(url, {...options, method: METHODS.GET}, options.timeout);
	};

	put = async (url: string, options: Record<string, any> = {}) => this.request(url, {...options, method: METHODS.PUT}, options.timeout);

	post = async (url: string, options: Record<string, any> = {}) => this.request(url, {...options, method: METHODS.POST}, options.timeout);

	delete = async (url: string, options: Record<string, any> = {}) => this.request(url, {...options, method: METHODS.DELETE}, options.timeout);

	setHeaders(xhr: XMLHttpRequest, options: Record<string, any>) {
		xhr.setRequestHeader('Access-Control-Allow-Credentials', 'true');

		if (options.headers) {
			Object.keys(options.headers).forEach(key => {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				xhr.setRequestHeader(key, (options.headers as Record<string, any>)[key]);
			});
		} else if (!options.data || !(options.data instanceof FormData)) {
			xhr.setRequestHeader('Content-Type', 'application/json');
		}
	}

	request = async (url: string, options: Record<string, any>, timeout = 5000) => new Promise<XMLHttpRequest>((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open(options.method, `${this.baseUrl}${url}`);
		xhr.withCredentials = true;
		xhr.timeout = timeout;

		this.setHeaders(xhr, options);

		xhr.onload = () => {
			resolve(xhr);
		};

		const handleError = (err: any) => {
			reject(err);
		};

		xhr.onabort = handleError;
		xhr.onerror = handleError;
		xhr.ontimeout = handleError;

		if (options.data) {
			if (options.data instanceof FormData) {
				xhr.send(options.data);
			} else {
				xhr.send(JSON.stringify(options.data));
			}
		} else {
			xhr.send();
		}
	});
}
