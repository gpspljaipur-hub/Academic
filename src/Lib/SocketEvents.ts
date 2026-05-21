import socketService from './SocketService';

export const SocketEvents = {
    onNewMessage: (callback: (data: any) => void) => {
        console.log('socketServiceonNewMessage', callback);
        socketService.on('receiveMessage', callback);
    },


    joinRoom: (userId: string,) => {
        socketService.emit('join', { userId });
    },

    seenMessage: (jobseekerId: string, recruiterId: string, userId: string) => {
        socketService.emit('seen', { jobseekerId, recruiterId, userId });
    },


    sendMessage: (data: { jobseekerId: string; recruiterId: string; senderId: string; receiverId: string; message: string }) => {
        socketService.emit('sendMessage', data);
    },

    offNewMessage: (callback: (data: any) => void) => {
        socketService.off('receiveMessage', callback);
    },



    removeMessageListener: (callback?: (data: any) => void) => socketService.off('receiveMessage', callback),

    removeAllListeners: (event: string) => socketService.off(event),
};

export default SocketEvents;
