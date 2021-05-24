import io from 'socket.io-client';

export const SOCKET_EMIT_USER_WATCH = 'user-watch';
export const SOCKET_EVENT_USER_UPDATED = 'user-updated';
export const SOCKET_EVENT_REVIEW_ADDED = 'review-added';

const baseUrl = process.env.NODE_ENV === 'production' ? '' : '//localhost:3030';
export const socketService = createSocketService();

window.socketService = socketService;

function createSocketService() {
    var socket = null;
    const socketService = {
        // socket is lazily created
        setup() {
            if (socket) return;
            socket = io(baseUrl);
        },
        on(eventName, cb) {
            if (!socket) socketService.setup();
            socket.on(eventName, cb);
        },
        off(eventName, cb = null) {
            if (!socket) socketService.setup();
            if (!cb) socket.removeAllListeners(eventName);
            else socket.off(eventName, cb);
        },
        emit(eventName, data) {
            if (!socket) socketService.setup();
            socket.emit(eventName, data);
        },
        terminate() {
            socket = null;
        },
        debounce(func, timeout = 500) {
            let timer;
            return (...args) => {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    func.apply(this, args);
                }, timeout);
            };
        },
    };
    return socketService;
}

