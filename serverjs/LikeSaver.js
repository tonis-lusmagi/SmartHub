const crypto = require('crypto');

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

module.exports = class LikeSaver {
    sha1(str) {
        return crypto.createHash('sha1').update(str).digest('hex');
    }

    constructor() {
        // Set some defaults (required if your JSON file is empty)
        db.defaults({ likes: [], count: 0 })
            .write();

        this.count = parseInt(db.get('count').value());
    }

    async writeToDb(str) {

        var hashValue = db.get('likes')
            .find({ hash: this.sha1(str) })
            .value();

        if (hashValue) {
            console.log('Denied - hash allready exists');
            return Promise.resolve();
        }

        db.get('likes')
            .push({ hash: this.sha1(str) })
            .write();

        db.update('count', n => n + 1)
            .write();

        ++this.count;

        return Promise.resolve();
    }
}