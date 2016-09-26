import SailsIOClient from 'sails.io.js';
import SocketIOClient from 'socket.io-client';

console.log('exports', io);
var io = SailsIOClient(SocketIOClient);
io.sails.url = 'http://localhost:1337';
io.socket.get('/comment', function serverResponded(body, JWR) {

    // JWR ==> "JSON WebSocket Response"
    console.log('Sails responded with: ', body);
    console.log('with headers: ', JWR.headers);
    console.log('and with status code: ', JWR.statusCode);

    // first argument `body` === `JWR.body`
    // (just for convenience, and to maintain familiar usage, a la `JQuery.get()`)
});

