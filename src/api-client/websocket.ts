export function useWebSocket(chatId: number, userId: number, token: string, onOpenCb: (event: Event) => void, onMessageCb: (e: {data: string}) => void) {
	const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);

	socket.addEventListener('open', onOpenCb);
	socket.addEventListener('message', onMessageCb);
	socket.addEventListener('error', event => {
		console.log('Ошибка', event);
	});
	return socket;
}
