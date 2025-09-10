import { useEffect, useRef, useCallback, useState } from 'react';

type MessageHandler = (event: MessageEvent) => void;

interface UseWebSocketProps {
	url: string;
	onOpen?: () => void;
	onClose?: (event: CloseEvent) => void;
	onError?: (event: Event) => void;
	reconnect?: boolean;
	reconnectInterval?: number;
	reconnectAttempts?: number;
}

export const useWebSocket = ({
	url,
	onOpen,
	onClose,
	onError,
	reconnect = true,
	reconnectInterval = 5000,
	reconnectAttempts = 5,
}: UseWebSocketProps) => {
	const [isConnected, setIsConnected] = useState(false);
	const [reconnectCount, setReconnectCount] = useState(0);
	const ws = useRef<WebSocket | null>(null);
	const reconnectTimeoutRef = useRef<any>(30);
	const messageHandlers = useRef<Set<MessageHandler>>(new Set());

	const connect = useCallback(() => {
		if (ws.current) {
			ws.current.close();
		}

		const socket = new WebSocket(url);
		ws.current = socket;

		socket.onopen = (event) => {
			console.log('WebSocket connected');
			setIsConnected(true);
			setReconnectCount(0);
			onOpen?.();
		};

		socket.onmessage = (event) => {
			messageHandlers.current.forEach((handler) => handler(event));
		};

		socket.onclose = (event) => {
			console.log('WebSocket disconnected');
			setIsConnected(false);
			onClose?.(event);

			if (reconnect && reconnectCount < reconnectAttempts) {
				console.log(`Attempting to reconnect... (${reconnectCount + 1}/${reconnectAttempts})`);
				reconnectTimeoutRef.current = setTimeout(() => {
					setReconnectCount((prev) => prev + 1);
					connect();
				}, reconnectInterval);
			}
		};

		socket.onerror = (error) => {
			console.error('WebSocket error:', error);
			onError?.(error);
		};
	}, [url, onOpen, onClose, onError, reconnect, reconnectInterval, reconnectAttempts, reconnectCount]);

	const sendMessage = useCallback((data: any) => {
		if (ws.current && ws.current.readyState === WebSocket.OPEN) {
			const message = typeof data === 'string' ? data : JSON.stringify(data);
			ws.current.send(message);
		} else {
			console.warn('WebSocket is not connected');
		}
	}, []);

	const addMessageHandler = useCallback((handler: MessageHandler) => {
		messageHandlers.current.add(handler);
		return () => {
			messageHandlers.current.delete(handler);
		};
	}, []);

	useEffect(() => {
		connect();

		return () => {
			if (ws.current) {
				ws.current.close();
			}
			if (reconnectTimeoutRef.current) {
				clearTimeout(reconnectTimeoutRef.current);
			}
		};
	}, [connect]);

	return {
		isConnected,
		sendMessage,
		addMessageHandler,
		reconnectCount,
		reconnect: connect,
	};
};

export default useWebSocket;
