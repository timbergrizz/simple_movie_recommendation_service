const mariadb = require('mariadb')
const pool = mariadb.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "movielens"
});

const getConnection = (callback) => {
    pool.getConnection().
        then(conn =>{
            callback(conn);
        })
}

module.exports = getConnection;
