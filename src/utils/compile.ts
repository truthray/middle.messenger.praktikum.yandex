export function compile(tmp: string): void {
	const app = document.querySelector('#app');
	if (!app) {
		throw new Error();
	}

	app.innerHTML = tmp;
}
