const mysql = require('mysql');

let connection;

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'skynet_db'
  });
}

connection.connect((err) => {
  if (err) return console.error(`error connecting: ${err.stack}`);
  console.log(`connected as id ${connection.threadId}`);
});

module.exports = connection;