module.exports = socket => {

    console.log(`socketId: ${socket.id} connected`);

    socket.on("disconnect", (reason) => {
        console.log(`socketId: ${socket.id} disconnected`);
    });

}