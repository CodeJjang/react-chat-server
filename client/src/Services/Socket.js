import SailsIOClient from 'sails.io.js';
import SocketIOClient from 'socket.io-client';

var _newCommentSyncEventName = 'sync_comments',
    _newUserSyncEventName = 'sync_users';

class Socket {
    constructor(props) {
        this.io = SailsIOClient(SocketIOClient);
        this.io.sails.url = props.url;
        this._commentsSyncCallback = null;
        this._usersSyncCallback = null;
        this._listenToSync = this._listenToSync.bind(this);
        this._listenToCommentsSync = this._listenToCommentsSync.bind(this);
        this._listenToUsersSync = this._listenToUsersSync.bind(this);
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
        this._listenToCommentsSync();
        this._listenToUsersSync();
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
}
export default Socket;
