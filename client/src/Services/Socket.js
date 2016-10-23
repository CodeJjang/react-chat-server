import SailsIOClient from 'sails.io.js';
import SocketIOClient from 'socket.io-client';

const _newCommentSyncEventName = 'sync_comments',
    _newUserSyncEventName = 'sync_users',
    _newRoomSyncEventName = 'sync_rooms';

class Socket {
    constructor(props) {
        this.io = SailsIOClient(SocketIOClient);
        this.io.sails.url = props.url;

        this._commentsSyncCallback = null;
        this._usersSyncCallback = null;
        this._roomsSyncCallback = null;

        this._stopListenToSync = this._stopListenToSync.bind(this);
        this._listenToSync = this._listenToSync.bind(this);
        this._listenToCommentsSync = this._listenToCommentsSync.bind(this);
        this._listenToUsersSync = this._listenToUsersSync.bind(this);
        this._listenToRoomsSync = this._listenToRoomsSync.bind(this);
        this.joinGlobalRoom = this.joinGlobalRoom.bind(this);
        this.joinRoom = this.joinRoom.bind(this);

        // an array of arrays in the form of [eventName, socketCallback]
        this._socketCallbacks = [];
    }

    joinGlobalRoom() {
        const self = this;
        return new Promise(function(resolve, reject) {
            console.log('Attempting to join global room...');
            self.io.socket.post(process.env.REACT_APP_ROOM_API_JOIN_GLOBAL_URL, function(body, JWR) {
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
        const self = this;
        return new Promise(function(resolve, reject) {
            console.log('Attempting to join room of id %s...', roomId);
            self.io.socket.post(
                process.env.REACT_APP_ROOM_API_JOIN_URL,
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
    _stopListenToSync() {
        this._socketCallbacks.forEach(params => {
            this.io.socket.off(...params);
        });
    }

    _listenToSync() {
        this._stopListenToSync();
        this._listenToCommentsSync();
        this._listenToUsersSync();
        this._listenToRoomsSync();
    }

    _listenToCommentsSync() {
        const callback = data => {
            console.log('Received comments sync message.');
            if(this._commentsSyncCallback) {
                this._commentsSyncCallback();
            }
            else {
                console.log('No callback is hooked.');
            }
        };
        this._socketCallbacks.push([_newCommentSyncEventName, callback]);
        this.io.socket.on(_newCommentSyncEventName, callback);
    }

    _listenToUsersSync() {
        const callback = data => {
            console.log('Received users sync message.');
            if(this._usersSyncCallback) {
                this._usersSyncCallback();
            }
            else {
                console.log('No callback is hooked.');
            }
        }; 
        this._socketCallbacks.push([_newUserSyncEventName, callback]);
        this.io.socket.on(_newUserSyncEventName, callback);
    }

    _listenToRoomsSync() {
        const callback = data => {
            console.log('Received rooms sync message.');
            if(this._roomsSyncCallback) {
                this._roomsSyncCallback();
            }
            else {
                console.log('No callback is hooked.');
            }
        };
        this._socketCallbacks.push([_newRoomSyncEventName, callback]);
        this.io.socket.on(_newRoomSyncEventName, callback);
    }

    set commentsSyncCallback(cb) {
        this._commentsSyncCallback = cb;
    }

    set usersSyncCallback(cb) {
        this._usersSyncCallback = cb;
    }

    set roomsSyncCallback(cb) {
        this._roomsSyncCallback = cb;
    }
}
export default Socket;
