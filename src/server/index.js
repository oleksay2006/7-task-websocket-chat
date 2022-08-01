require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const formatMessage = require('../static/utils/formatMessage');
const events = require('./events');
const server = require('./server');

const server2 = http.createServer(server);

const io = new Server(server2);

const botName = 'Chatbot';

io.on('connection', (socket) => {
  socket.on('joinChat', ({ user }) => {
    socket.data.user = user;
    socket.emit('message', formatMessage(botName, 'Welcome to chat!'));

    socket.broadcast.emit('message', formatMessage(botName, `${user.firstname} now online`));
    socket.broadcast.emit('userOnline', user);
  });

  socket.on('userTyping', () => {
    const { user } = socket.data;
    socket.broadcast.emit('typing', user.firstname);
  });

  socket.on('stopTyping', () => {
    socket.broadcast.emit('stopTyping');
  });

  socket.on('chatMessage', (msg) => {
    const { user } = socket.data;

    io.emit('message', formatMessage(user.firstname, msg));
  });

  socket.on('disconnect', () => {
    const { user } = socket.data;
    io.emit('message', formatMessage(botName, `${user.firstname} now offline`));
    io.emit('userOffline', user);
  });
});

const port = server.get('port');

events.bind(
  server2.listen(port),
);
