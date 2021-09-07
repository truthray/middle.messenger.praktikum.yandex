import {Route, Router, useRouter} from './router';
import Index from '../pages';
import Signin from '../pages/signin';
import Signup from '../pages/signup';
import Err404 from '../pages/404';
import { expect } from 'chai';

import {JSDOM} from 'jsdom';

declare global {
    namespace NodeJS {
        interface Global {
            document: Document;
            window: Window;
            navigator: Navigator;
        }
    }
}

describe('Проверяем переходы у Роута', () => {

	function createRouter() {
		return new Router()
			.use('/messenger', Index)
			.use('/settings', Index)
			.use('/', Signin)
			.use('/sign-up', Signup)
			.use('/404', Err404)
			.onNotFound(Err404);
	}

	beforeEach(() => {
		const dom = new JSDOM('<!DOCTYPE html><div id="app"></div>', {
			url: 'http://localhost',
		});
		global.document = dom.window.document;
		// @ts-ignore
		global.window = global.document.defaultView;
		// @ts-ignore
		global.window.router = createRouter();
		window.location.href = 'http://localhost';
		
	})

	it('Проверка, что все роуты создались', () => {
		const router = createRouter();
		router.start();
		expect(router.routes.length).to.eq(5);
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

	it('Роутер может быть в одном экземпляре', () => {
		createRouter();

		const router1 = useRouter();
		const router2 = useRouter();
	
		expect(router1).to.eq(router2);
	});

	describe('Проверка истории роутера', () => {
		it('История роутера при одном переходе', () => {
			const router = createRouter();
			
			router.start();
			router.go('/');
		
			expect(router.getHistory.length).to.eq(2);
		});
		it('История роутера при двух переходе', () => {
			const router = createRouter();
			
			router.start();
			router.go('/');
			router.go('/sign-up');
		
			expect(router.getHistory.length).to.eq(3);
		});
		it('Проверка текущей страницы после перехода', () => {
			const router = createRouter();

			router.start();
			router.go('/');
		
			expect(router.getCurrentRoute?.block).to.instanceOf(Signin);
		});
		it('Проверка текущей страницы после нескольких перехода', () => {
			const router = createRouter();

			router.start();
			router.go('/');
			router.go('/messenger');
		
			expect(router.getCurrentRoute?.block).to.instanceOf(Index);
		});
	});
});
