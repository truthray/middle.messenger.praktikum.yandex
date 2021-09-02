import {v4 as makeUUID} from 'uuid';
import EventBus from './event-bus';

enum EVENTS {
	INIT = 'init',
	FLOW_CDM = 'flow:component-did-mount',
	FLOW_CDU = 'flow:component-did-update',
	FLOW_RENDER = 'flow:render',
}

type Props = Record<string, any | Block>;

export default class Block {
	public readonly props: Props;

	private element?: HTMLElement;
	private readonly eventBus: EventBus;
	private readonly tagName: string;
	private readonly uuid: string;

	constructor(tagName = 'div', props = {}) {
		this.eventBus = new EventBus();
		this.tagName = tagName;
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		this.uuid = makeUUID();

		this.props = this._makePropsProxy(props);

		this._registerEvents(this.eventBus);
		this.eventBus.emit(EVENTS.INIT);
	}

	_registerEvents(eventBus: EventBus) {
		eventBus.on(EVENTS.INIT, this.init.bind(this));
		eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	_addEvents() {
		const {events = {}} = this.props;

		Object.keys(events).forEach(eventName => {
			if (this.element) {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				this.element.addEventListener(eventName, events[eventName]);
			}
		});
	}

	_createResources() {
		this.element = this._createDocumentElement(this.tagName);
	}

	init() {
		this._createResources();
	}

	_componentDidMount() {
		this.componentDidMount();
	}

	blockWithId() {
		return `<${this.tagName} id="${this.uuid}"></${this.tagName}>`;
	}

	id() {
		return this.uuid;
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	componentDidMount() {}

	_componentDidUpdate() {
		const response = this.componentDidUpdate();
		if (response) {
			this.eventBus.emit(EVENTS.FLOW_RENDER);
		}
	}

	componentDidUpdate() {
		return true;
	}

	setProps = (nextProps: Props) => {
		if (!nextProps) {
			return;
		}

		Object.assign(this.props, nextProps);
		this.eventBus.emit(EVENTS.FLOW_CDU);
	};

	_render() {
		const block: string = this.render();
		if (this.element) {
			this.element.innerHTML = block;

			const currentElement = document.getElementById(this.id());
			currentElement?.parentNode?.replaceChild(this.element, currentElement);
		}

		this._addEvents();

		Object.keys(this.props).forEach(x => {
			if (this.props[x] instanceof Block) {
				(this.props[x] as Block)._render();
			} else if (Array.isArray(this.props[x])) {
				(this.props[x] as any[]).forEach(y => {
					if (y instanceof Block) {
						y._render();
					}
				});
			}
		});
		this.eventBus.emit(EVENTS.FLOW_CDM);
	}

	render(): string {
		return '';
	}

	getContent() {
		return this.element;
	}

	_makePropsProxy(props: Props) {
		const thisProps = new Proxy(props, {
			deleteProperty() {
				throw new Error('Нет доступа');
			},
		});
		return thisProps;
	}

	_createDocumentElement(tagName: string) {
		const element = document.createElement(tagName);
		element.setAttribute('data-id', this.uuid);
		return element;
	}

	show() {
		if (this.element) {
			this.element.style.display = 'block';
		}
	}

	hide() {
		if (this.element) {
			this.element.style.display = 'none';
		}
	}
}
