//1. Packages
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

//2. Configuration
const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
});

//3. MiddleWare
app.use(cors());

//4. Socket.io stuff
io.on('connection', (socket) => {
    console.log('New Client connected');

    socket.on('message', (message) => {
        console.log('Message Received:', message);
        io.emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log('Client Disconnected');
    });
});

//5. Run The Server
const PORT = 5000;
server.listen(PORT, () => console.log(`Server Is Listening On Port: ${PORT}`));
