const io = require('socket.io')(process.env.SOCKET_PORT, {
    cors: {
        origin: "*",
        methods: ['GET', 'POST']
    }
})

console.log(`Socket.IO server is running on port ${process.env.SOCKET_PORT}...`);

io.on("connection", (socket) => {
    console.log("socket is connected.")
});


module.exports = io;