import SailsIOClient from 'sails.io.js';
import SocketIOClient from 'socket.io-client';

var _newCommentSyncEventName = 'sync_comments',
    _newUserSyncEventName = 'sync_users',
    _newRoomSyncEventName = 'sync_rooms';

class Socket {
    constructor(props) {
        this.io = SailsIOClient(SocketIOClient);
        this.io.sails.url = props.url;

        this._commentsSyncCallback = null;
        this._usersSyncCallback = null;
        this._roomsSyncCallback = null;

        this._listenToSync = this._listenToSync.bind(this);
        this._listenToCommentsSync = this._listenToCommentsSync.bind(this);
        this._listenToUsersSync = this._listenToUsersSync.bind(this);
        this._listenToRoomsSync = this._listenToRoomsSync.bind(this);
        this.joinGlobalRoom = this.joinGlobalRoom.bind(this);
        this.joinRoom = this.joinRoom.bind(this);
    }
    joinGlobalRoom() {
        var self = this;
        return new Promise(function(resolve, reject) {
            console.log('Attempting to join global room...');
            self.io.socket.post('/room/joinGlobalRoom', function(body, JWR) {
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
    joinRoom(roomId) {
        var self = this;
        return new Promise(function(resolve, reject) {
            console.log('Attempting to join room of id %s...', roomId);
            self.io.socket.post(
                '/room/join',
                { roomId: roomId },
                function(body, JWR) {
                    if (JWR.statusCode !== 200) {
                        console.log('Failed joining room with id %s.', roomId);
                        console.log('Sails responded with: ', body);
                        console.log('with headers: ', JWR.headers);
                        console.log('and with status code: ', JWR.statusCode);
                        reject();
                    } else {
                        console.log('Joined room with id %s.', roomId);
                        self._listenToSync();
                        resolve();
                    }
                });
        });
    }
    _listenToSync() {
        this._listenToCommentsSync();
        this._listenToUsersSync();
        this._listenToRoomsSync();
    }

    _listenToCommentsSync() {
        var self = this;
        this.io.socket.on(_newCommentSyncEventName, function(data) {
            console.log('Received comments sync message.');
            self._commentsSyncCallback();
        });
    }

    _listenToUsersSync() {
        var self = this;
        this.io.socket.on(_newUserSyncEventName, function(data) {
            console.log('Received users sync message.');
            self._usersSyncCallback();
        });
    }

    _listenToRoomsSync() {
        var self = this;
        this.io.socket.on(_newRoomSyncEventName, function(data) {
            console.log('Received rooms sync message.');
            self._roomsSyncCallback();
        });
    }

    set commentsSyncCallback(cb) {
        if (cb) {
            this._commentsSyncCallback = cb;
        }
    }

    set usersSyncCallback(cb) {
        if (cb) {
            this._usersSyncCallback = cb;
        }
    }

    set roomsSyncCallback(cb) {
        if (cb) {
            this._roomsSyncCallback = cb;
        }
    }
}
export default Socket;
