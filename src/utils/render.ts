import Block from '../common/block';

export default function render(query: string, block: Block) {
	const root = document.querySelector(query);
	if (root?.textContent && block.getContent()) {
		root.textContent = block.getContent();
	}

	return root;
}
