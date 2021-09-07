export function compile(tmp: string): void {
	const app = document.querySelector('#app');
	if (!app) {
		return;
	}

	app.innerHTML = tmp;
}
