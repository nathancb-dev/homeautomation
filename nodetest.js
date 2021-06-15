const io = require("socket.io-client");

const socket = io.connect("http://localhost:3000/", {
    auth: { token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MGI1NWYzMTc3M2QwYTNhM2EyMjMzZGEiLCJpYXQiOjE2MjI1MDI3MTV9.CV-vq_RAjU9owxsqtiq1MYyZBUo0RRkfjQAsZGjoOeE" },
    query: { type: "node" }
})

socket.on('connect_error', (e) => {
    console.log(e)
});

socket.on('connect', () => {
    console.log('connected')
});

socket.on('disconnect', () => {
    console.log('disconnected')
})

socket.on('has/b/device/lamp1', (value) => {
    console.log(value)
});

socket.emit('has/mqtt/teste', { topic: "has/opa", payload: "teste" });