import SailsIOClient from 'sails.io.js';
import SocketIOClient from 'socket.io-client';

// var io = SailsIOClient(SocketIOClient);
// io.sails.url = 'http://localhost:1337';
// io.socket.get('/comment', function serverResponded(body, JWR) {

//     // JWR ==> "JSON WebSocket Response"
//     console.log('Sails responded with: ', body);
//     console.log('with headers: ', JWR.headers);
//     console.log('and with status code: ', JWR.statusCode);

//     // io.socket.disconnect();
//     // first argument `body` === `JWR.body`
//     // (just for convenience, and to maintain familiar usage, a la `JQuery.get()`)
// });
class Socket {
    constructor(props) {
        this.io = SailsIOClient(SocketIOClient);
        this.io.sails.url = props.url;
        this._syncCallback = null;
        this._listenToSync = this._listenToSync.bind(this);
        this.joinGlobalRoom = this.joinGlobalRoom.bind(this);
    }
    joinGlobalRoom() {
        console.log('Attempting to join global room...');
        var self = this;
        this.io.socket.get('/room/joinGlobalRoom', function(body, JWR) {
            if (JWR.statusCode !== 200) {
                console.log('Failed joining global room.');
                console.log('Sails responded with: ', body);
                console.log('with headers: ', JWR.headers);
                console.log('and with status code: ', JWR.statusCode);
            } else {
                console.log('Joined global room.');
                self._listenToSync();
            }
        });
    }
    _listenToSync() {
        var self = this;
        this.io.socket.on('sync', function(data) {
            console.log('Received sync message.');
            self._syncCallback();
        });
    }
    set syncCallback(cb) {
        if (cb) {
            this._syncCallback = cb;
        }
    }
    test() {
        this.io.socket.get('/comment', function(body, JWR) {
            // JWR ==> "JSON WebSocket Response"
            console.log('Sails responded with: ', body);
            console.log('with headers: ', JWR.headers);
            console.log('and with status code: ', JWR.statusCode);

            // io.socket.disconnect();
            // first argument `body` === `JWR.body`
            // (just for convenience, and to maintain familiar usage, a la `JQuery.get()`)
        });
    }
}
export default Socket;
