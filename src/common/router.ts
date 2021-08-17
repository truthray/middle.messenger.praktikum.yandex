import isEqual from '../utils/is-equal';
import render from '../utils/render';
import Block from './block';

export class Route {
	private block: Block | null = null;

	constructor(private pathname: string, private readonly BlockClass: new () => Block, private readonly props: Record<string, any>) {}

	navigate(pathname: string) {
		if (this.match(pathname)) {
			this.pathname = pathname;
			this.render();
		}
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
		console.log(this.props.rootQuery);
		if (!this.block) {
			this.block = new this.BlockClass();
			console.log('block: ', this.block);
		}

		this.block.render();
	}
}

export class Router {
	static instance: Router | null = null;

	private readonly routes: Route[];
	private notFound: Route | undefined;
	private readonly history: History;
	private readonly rootQuery: string;
	private currentRoute: Route | undefined;

	constructor(rootQuery: string) {
		this.routes = [];
		this.history = window.history;
		this.currentRoute = undefined;
		this.rootQuery = rootQuery;
		if (!Router.instance) {
			Router.instance = this;
		}
	}

	use<T extends Block>(pathname: string, block: new () => T) {
		const route = new Route(pathname, block, {rootQuery: this.rootQuery});
		this.routes.push(route);
		return this;
	}

	onNotFound<T extends Block>(block: new () => T, pathname = '/not-found') {
		this.notFound = new Route(pathname, block, {rootQuery: this.rootQuery});
		return this;
	}

	start() {
		window.onpopstate = (event: PopStateEvent) => {
			this._onRoute(event.currentTarget.location.pathname);
		};

		this._onRoute(window.location.pathname);
	}

	_onRoute(pathname: string) {
		console.log(pathname);
		console.log(this.routes);
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

	go(pathname: string) {
		this.history.pushState({}, '', pathname);
		this._onRoute(pathname);
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
