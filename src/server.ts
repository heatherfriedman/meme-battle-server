import express from 'express';
import socketIO from 'socket.io';

const app = express();

const port = process.env.PORT || 3001;

const server = app.listen(port, () =>
  console.log(`server listening on port ${port}`),
);

const io = socketIO(server);
