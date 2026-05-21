import { io, Socket } from 'socket.io-client';
import Config from './ApiService/Config';

class SocketService {
    private socket: Socket | null = null;
    private listeners: Map<string, Set<(data: any) => void>> = new Map();
    private lastUserId: string | undefined;
    private reconnectTimer: any = null;

    initializeSocket = (userId?: string) => {
        if (userId) this.lastUserId = userId;

        try {
            if (this.socket) {
                console.log('Socket already initialized');
                if (this.socket.connected) return;
                this.socket.removeAllListeners();
                this.socket.disconnect();
                this.socket = null;
            }

            this.socket = io(Config.socketurl, {
                query: this.lastUserId ? { userId: this.lastUserId } : {},
                auth: {
                    userId: this.lastUserId,
                },
            });

            this.socket.on('connect', () => {
                console.log('=== Socket Connected ===', this.socket?.id);
                if (this.reconnectTimer) {
                    clearTimeout(this.reconnectTimer);
                    this.reconnectTimer = null;
                }
                // Attach all queued listeners
                this.listeners.forEach((callbacks, event) => {
                    callbacks.forEach(cb => {
                        this.socket?.on(event, cb);
                    });
                });
            });

            this.socket.on('disconnect', (reason) => {
                console.log('=== Socket Disconnected ===', reason);
                this.socket = null;
                this.reconnect();
            });

            this.socket.on('connect_error', (error) => {
                console.log('=== Socket Connect Error ===', error);
                this.reconnect();
            });

        } catch (error) {
            console.log('Socket Initialization Error:', error);
        }
    }

    private reconnect() {
        if (this.reconnectTimer) return;
        this.reconnectTimer = setTimeout(() => {
            this.reconnectTimer = null;
            console.log('=== Attempting Reconnection ===');
            this.initializeSocket();
        }, 3000);
    }

    emit(event: string, data: any = {}) {
        console.log('Emitting event:', event, data);
        if (this.socket) {
            this.socket.emit(event, data);
        } else {
            console.log('Socket not initialized, cannot emit:', event);
        }
    }

    on(event: string, cb: (data: any) => void) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }
        this.listeners.get(event)?.add(cb);

        if (this.socket) {
            this.socket.on(event, cb);
        }
    }

    off(event: string, cb?: (data: any) => void) {
        if (cb) {
            this.listeners.get(event)?.delete(cb);
            if (this.socket) {
                this.socket.off(event, cb);
            }
        } else {
            this.listeners.delete(event);
            if (this.socket) {
                this.socket.off(event);
            }
        }
    }

    removeListener(event: string, cb?: (data: any) => void) {
        this.off(event, cb);
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
        this.listeners.clear();
    }
}

const socketService = new SocketService();
export default socketService;
