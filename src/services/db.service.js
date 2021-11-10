import { storeInstance } from '../boot/store';
import { Notify } from 'quasar';

export default {
    db: window.openDatabase('songbook', '1', 'Songbook database', 31457280),

    createTable(name, fields) {
        this.db.transaction(function (tx) {
            return tx.executeSql(`CREATE TABLE IF NOT EXISTS ${name} (id INTEGER PRIMARY KEY, ${fields.join(',')})`)
        })
    },

    insertIntoTable(name, keys, values) {
        this.db.transaction(function(tx){
            return tx.executeSql(`INSERT INTO ${name} (${keys.join(",")}) VALUES (?)`, [values], this.successMess, this.displayError);
        }.bind(this))
        Notify.create({
            type: 'positive',
            color: 'primary',
            message: 'Էջանշումը կատարվել է:',
            position: 'top',
            timeout: 500
          })
    },

    insertIfExistsUpdate(name, values) {
        this.db.transaction(function(tx){
            return tx.executeSql(`insert or replace into ${name} (id, fontSize, background) values ((select id from ${name} where id = "1"),?,?)`, values, this.successMess, this.displayError)
        }.bind(this))
    },

    deleteFromTable(name, key, value) {
        this.db.transaction(function(tx){
            tx.executeSql(`DELETE FROM ${name} WHERE ${key} = ${value}`, [], function(tx, res){
                storeInstance.dispatch('song/deleteMark', value);
                Notify.create({
                    type: 'positive',
                    color: 'primary',
                    message: 'Էջանշումը հանվել է:',
                    position: 'top',
                    timeout: 500
                  })
                console.log(tx)
            },function(tx, err){
                console.log(err.message);
        });
        })
    },

    selectAllFromTable() {
        this.db.transaction(function(tx) {
            tx.executeSql(`SELECT * FROM bookmark`, [], function(tx, result){
                let len = result.rows.length;
                let bookmarks = [];
                for (var i=0; i<len; i++){
                    bookmarks.push(result.rows.item(i))
                }
                storeInstance.dispatch('song/loadBookmarks', bookmarks);
            }, function(tx, error){
                console.log(error.message)
            });
        });
    },

    selectAllSettings() {
        this.db.transaction(function(tx) {
            tx.executeSql(`SELECT * FROM settings`, [], function(tx, result){
                storeInstance.dispatch('setting/setSettings', result.rows.item(0));
            }, function(tx, error){
                console.log(error.message)
            });
        });
    },

    successMess(msg) {
        console.log(msg)
    },

    displayError(tr, error) {
        console.log(error.message);
    },

}