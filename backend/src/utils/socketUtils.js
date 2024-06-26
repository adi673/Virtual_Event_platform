// utils/socketUtils.js

const socketIO = require('socket.io');
let io;

const initializeSocketIO = (server) => {
    io = socketIO(server);

    io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('joinRoom', (roomId) => {
            socket.join(roomId);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
};

const getIO = () => {
    if (!io) {
        throw new Error('Socket.IO not initialized');
    }
    return io;
};

module.exports = {
    initializeSocketIO,
    getIO,
};
