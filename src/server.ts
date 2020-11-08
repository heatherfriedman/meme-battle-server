import express from 'express';
import socketIO from 'socket.io';
import { User } from 'meme-battle';

const app = express();

const port = process.env.PORT || 3001;

const server = app.listen(port, () => console.log(`server listening on port ${port}`));

const io = socketIO(server);

io.on('connection', socket => {
  console.log('a user connected with id:', socket.id);
  socket.on('disconnect', () => {
    console.log(`user ${socket.id} disconnected`);
  });

  socket.on('enter waiting room', payload => {
    console.log('entering waiting room...');
    io.emit('login/enterWaitingRoomSuccess', {
      type: 'login/enterWaitingRoomSuccess',
      payload: {
        user: {
          username: payload.username,
        },
      },
    });
  });

  socket.on('enter game', (user: User) => {
    socket.broadcast.emit('enter game success', user);
  });
});
