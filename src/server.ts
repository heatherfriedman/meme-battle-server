import express from 'express';
import socketIO from 'socket.io';

const app = express();

const port = process.env.PORT || 3001;

const server = app.listen(port, () => console.log(`server listening on port ${port}`));

const io = socketIO(server);

io.on('connection', socket => {
  console.log('a user connected with id:', socket.id);
  socket.on('disconnect', () => {
    console.log(`user ${socket.id} disconnected`);
  });
  socket.on('set username', name => {
    console.log(name, 'set as username');
  });
});
