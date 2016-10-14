import SailsIOClient from 'sails.io.js';
import SocketIOClient from 'socket.io-client';

class Socket {
    constructor(props) {
        this.io = SailsIOClient(SocketIOClient);
        this.io.sails.url = props.url;
        this._syncCallback = null;
        this._listenToSync = this._listenToSync.bind(this);
        this.joinGlobalRoom = this.joinGlobalRoom.bind(this);
    }
    joinGlobalRoom() {
        var self = this;
        return new Promise(function(resolve, reject) {
            console.log('Attempting to join global room...');
            self.io.socket.get('/room/joinGlobalRoom', function(body, JWR) {
                if (JWR.statusCode !== 200) {
                    console.log('Failed joining global room.');
                    console.log('Sails responded with: ', body);
                    console.log('with headers: ', JWR.headers);
                    console.log('and with status code: ', JWR.statusCode);
                    reject();
                } else {
                    console.log('Joined global room.');
                    self._listenToSync();
                    resolve();
                }
            });
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
}
export default Socket;
