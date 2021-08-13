enum METHODS {
	GET = 'GET',
	PUT = 'PUT',
	POST = 'POST',
	DELETE = 'DELETE',
}

function queryStringify(data: Record<string, string>) {
	if (Array.isArray(data)) {
		return data.join(',');
	}

	return Object.keys(data).reduce((acc, x) => acc === ''
		? acc + `${x}=${data[x]}`
		: acc + `&${x}=${data[x]}`, '');
}

export default class HTTPTransport {
	get = async (url: string, options: Record<string, any> = {}) => {
		url = options.data ? `${url}?${queryStringify(options.data)}` : url;
		options.data = undefined;
		return this.request(url, {...options, method: METHODS.GET}, options.timeout);
	};

	put = async (url: string, options: Record<string, any> = {}) => this.request(url, {...options, method: METHODS.PUT}, options.timeout);

	post = async (url: string, options: Record<string, any> = {}) => this.request(url, {...options, method: METHODS.POST}, options.timeout);

	delete = async (url: string, options: Record<string, any> = {}) => this.request(url, {...options, method: METHODS.DELETE}, options.timeout);

	request = async (url: string, options: Record<string, any>, timeout = 5000) => new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open(options.method, url);
		xhr.timeout = timeout;
		if (options.headers) {
			Object.keys(options.headers).forEach(key => {
				// TODO FIX
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				xhr.setRequestHeader(key, (options.headers as Record<string, any>)[key]);
			});
		}

		xhr.setRequestHeader('Content-Type', 'text/plain');

		xhr.onload = () => {
			console.log(xhr);
			resolve(xhr);
		};

		const handleError = (err: any) => {
			reject(err);
		};

		xhr.onabort = handleError;
		xhr.onerror = handleError;
		xhr.ontimeout = handleError;

		if (options.data) {
			xhr.send();
		} else {
			xhr.send(JSON.stringify(options.data));
		}
	});
}
