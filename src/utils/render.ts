import Block from '../common/block';

export default function render(query: string, block: Block) {
	const root = document.querySelector(query);
	const content = block.getContent();
	if (root?.textContent && content) {
		root.textContent = (content as unknown as string);
	}

	return root;
}
