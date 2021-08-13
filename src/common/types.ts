
export interface ChatArea {
	currentDate: string | null;
	init: () => void;
	destroy: () => void;
	sendMessageHandler: () => void;
	addFileClickHandler: () => void;
}
