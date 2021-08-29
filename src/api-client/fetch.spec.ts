import {expect} from 'chai';
import {queryString} from './fetch';

describe('Проверка модуля запросов', () => {
	it('Корректная работа queryString с простыми типами', () => {
		expect(queryString({a: 1, b: 4})).to.eq('a=1&b=4');
	});

	it('Корректная работа queryString с вложенными объектами', () => {
		expect(queryString({a: 1, b: 4, c: {f: 1, d: 1}})).to.eq('a=1&b=4&c[f]=1&c[d]=1');
	});
});
