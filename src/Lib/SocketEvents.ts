import socketService from './SocketService';

export const SocketEvents = {
    onNewMessage: (callback: (data: any) => void) => {
        socketService.on('receiveMessage', callback);
    },


    joinRoom: (id: string) => {
        socketService.emit('join', { roomId: id });
    },

    seenMessage: (parentId: string, senderId: string) => {
        socketService.emit('seen', { parentId, senderId });
    },


    sendMessage: (data: { parentId: string; senderId: string; receiverId: string; message: string; studentId: string }) => {
        socketService.emit('sendMessage', data);
    },

    offNewMessage: (callback: (data: any) => void) => {
        socketService.off('receiveMessage', callback);
    },


    removeMessageListener: (callback?: (data: any) => void) => socketService.off('receiveMessage', callback),

    removeAllListeners: (event: string) => socketService.off(event),
};

export default SocketEvents;
