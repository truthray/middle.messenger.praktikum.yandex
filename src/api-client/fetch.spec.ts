import { UserInfo } from './../models/user';
import {expect} from 'chai';
import HTTPTransport, {queryString} from './fetch';
import Sinon, { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from 'sinon';

describe('Проверка модуля запросов', () => {

	describe('Утилиты', () => {

		it('Корректная работа queryString с простыми типами', () => {
			expect(queryString({a: 1, b: 4})).to.eq('a=1&b=4');
		});

		it('Корректная работа queryString с вложенными объектами', () => {
			expect(queryString({a: 1, b: 4, c: {f: 1, d: 1}})).to.eq('a=1&b=4&c[f]=1&c[d]=1');
		});

		it('Корректная конкатинация url', () => {
			expect(new HTTPTransport('/users').url).to.eq('https://ya-praktikum.tech/api/v2/users');
		});
	})

	it('400 при неверных данных', (done) => {
		const client = new HTTPTransport('/auth')
		client.post('/signin', {data: {}}).then((data) => {
			expect((data as XMLHttpRequest).status).to.eq(400);
			done()
		});
	});

	it('401 при правильной структуре, но некорректных данных', (done) => {
		const client = new HTTPTransport('/auth')
		const user: UserInfo = {
			login: '',
			password: '',
		}
		client.post('/signin', {data: user}).then((data) => {
			expect((data as XMLHttpRequest).status).to.eq(401);
			done()
		});
	});

	describe('Отправка запросов', () => {

		var requests: SinonFakeXMLHttpRequest[] = []
		var xhr: SinonFakeXMLHttpRequestStatic;
		beforeEach(function () {
			xhr = Sinon.useFakeXMLHttpRequest();
			requests = [];
			xhr.onCreate = function (request: any) {
			requests.push(request);
			};
		});
		
		afterEach(function () {
			xhr.restore();
		});

		it('Проверка, отправляются ли GET запросы', (done) => {
			const client = new HTTPTransport('')
			client.get('/', {data: {}}).then((res) => {
				expect((res as SinonFakeXMLHttpRequest).method).to.equal('GET');
				done();
			})
			requests[0].respond(200, null, '');
		})

		it('Проверка, отправляются ли POST запросы', (done) => {
			const client = new HTTPTransport('')
			client.post('/', {data: {}}).then((res) => {
				expect((res as SinonFakeXMLHttpRequest).method).to.equal('POST');
				done();
			})
			requests[0].respond(200, null, '');
		})

		it('Проверка, отправляются ли PUT запросы', (done) => {
			const client = new HTTPTransport('')
			client.put('/', {data: {}}).then((res) => {
				expect((res as SinonFakeXMLHttpRequest).method).to.equal('PUT');
				done();
			})
			requests[0].respond(200, null, '');
		})

		it('Проверка, отправляются ли DELETE запросы', (done) => {
			const client = new HTTPTransport('')
			client.delete('/', {data: {}}).then((res) => {
				expect((res as SinonFakeXMLHttpRequest).method).to.equal('DELETE');
				done();
			})
			requests[0].respond(200, null, '');
		})

		it('Проверка подстановки queryString в GET запросах', (done) => {
			const client = new HTTPTransport('')
			client.get('/', {data: {a: 1}}).then((res) => {
				expect((res as SinonFakeXMLHttpRequest).url).to.equal('https://ya-praktikum.tech/api/v2/?a=1');
				done();
			})
			requests[0].respond(200, null, '');
		})

		it('Проверка на прямую передачу FormData (без stringify)', (done) => {
			const client = new HTTPTransport('')
			const formData = new FormData();
			client.put('/', {data: formData}).then((res) => {
				expect((res as SinonFakeXMLHttpRequest).requestBody).to.equal(formData);
				done();
			})
			requests[0].respond(200, null, '');
		})

		it('Проверка на перевод объекта в строку', (done) => {
			const client = new HTTPTransport('')
			client.put('/', {data: {a: 1, b: 4}}).then((res) => {
				expect((res as SinonFakeXMLHttpRequest).requestBody).to.equal('{"a":1,"b":4}');
				done();
			})
			requests[0].respond(200, null, '');
		})
	});
});