import {Route, Router, useRouter} from './router';
import Index from '../pages';
import Signin from '../pages/signin';
import Signup from '../pages/signup';
import Err404 from '../pages/404';
import { expect } from 'chai';

describe('Проверяем переходы у Роута', () => {
	function createRouter() {
		return new Router()
			.use('/', Index)
			.use('/signin', Signin)
			.use('/signup', Signup)
			.use('/404', Err404)
			.onNotFound(Err404);
	}

	it('Проверка, что все роуты создались', () => {
		const router = createRouter();
		router.start();
		expect(router.routes.length).to.eq(4);
	});

	it('Изначально нет текущего роута', () => {
		const router = createRouter();
		expect(router.getCurrentRoute).to.eq(undefined);
	});

	it('После запуска есть активный роут', () => {
		const router = createRouter();
		router.start();
		expect(router.getCurrentRoute).to.instanceOf(Route);
	});

	it('Установлена страница 404', () => {
		const router = createRouter();
		router.start()
		expect(router.notFound?.block).to.instanceOf(Err404);
	});

	it('Роутер может быть в одном экземпляре', () => {
		createRouter();

		const router1 = useRouter();
		const router2 = useRouter();
	
		expect(router1).to.eq(router2);
	});
});
