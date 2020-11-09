import express from 'express';
import socketIO from 'socket.io';
import { User } from 'meme-battle-core';
import * as events from 'meme-battle-core/lib/login';

const app = express();

const port = process.env.PORT || 3001;

const server = app.listen(port, () => console.log(`server listening on port ${port}`));

const io = socketIO(server);

io.on('connection', socket => {
  console.log('a user connected with id:', socket.id);
  socket.on('disconnect', () => {
    console.log(`user ${socket.id} disconnected`);
  });

  socket.on(events.enterWaitingRoomStart, payload => {
    console.log('a user entered waiting room with id:', socket.id);
    io.emit(events.enterWaitingRoomSuccess, {
      type: events.enterWaitingRoomSuccess,
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
