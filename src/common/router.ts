import isEqual from '../utils/is-equal';
import Block from './block';

export class Route {
	block: Block | undefined = undefined;
	private params: string | number | undefined = undefined;

	constructor(private pathname: string, private readonly BlockClass: new () => Block) {}

	navigate(pathname: string) {
		if (this.match(pathname)) {
			this.pathname = pathname;
			this.render();
		}
	}

	setParams(value: number | string | undefined) {
		this.params = value;
	}

	get pathParams() {
		return this.params;
	}

	leave() {
		if (this.block) {
			this.block.hide();
		}
	}

	match(pathname: string) {
		return isEqual(pathname, this.pathname);
	}

	render() {
		if (!this.block) {
			this.block = new this.BlockClass();
		}

		this.block.render();
	}
}

export class Router {
	static instance: Router | undefined;

	readonly routes: Route[];
	notFound: Route | undefined;
	private readonly history: History;
	private currentRoute: Route | undefined;

	constructor() {
		this.routes = [];
		this.history = window.history;
		this.currentRoute = undefined;

		if (!Router.instance) {
			Router.instance = this;
		}
	}

	get getCurrentRoute() {
		return this.currentRoute;
	}

	get getHistory() {
		return this.history;
	}

	use<T extends Block>(pathname: string, block: new () => T) {
		const route = new Route(pathname, block);
		this.routes.push(route);
		return this;
	}

	onNotFound<T extends Block>(block: new () => T, pathname = '/not-found') {
		this.notFound = new Route(pathname, block);
		return this;
	}

	start() {
		window.onpopstate = (event: any) => {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			this._onRoute(event.currentTarget.location.pathname);
		};

		this._onRoute(window.location.pathname);
	}

	_onRoute(pathname: string) {
		const route = this.getRoute(pathname);

		if (this.currentRoute) {
			this.currentRoute.leave();
		}

		if (route) {
			this.currentRoute = route;
		} else {
			this.currentRoute = this.notFound;
		}

		this.currentRoute?.render();
	}

	go(pathname: string, params: Record<string, any> | undefined = {}) {
		this.history.pushState(params, '', pathname);
		this._onRoute(pathname);
	}

	get queryParams(): Record<string, any> {
		const current = this.history.state as Record<string, any>;
		return current;
	}

	back() {
		this.history.back();
	}

	forward() {
		this.history.forward();
	}

	getRoute(pathname: string) {
		return this.routes.find(route => route.match(pathname));
	}
}

export function useRouter(): Router | undefined {
	return Router.instance;
}
