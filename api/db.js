// const Axios = require("axios");
// const qs = require("qs");
// const sqlite3 = require('sqlite3').verbose();


//создаем базу данных
const db = new sqlite3.Database('testDB.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the USERS SQlite database.');
    console.log(db); 
});

//создаём функцию которая заносит в таблицу базы данных значения
const addToDB = (resource_id_value, path_value) => {
    db.run(`INSERT INTO USERS(resource_id, path) VALUES("${resource_id_value}", "${path_value}")`, function(err) {
        if (err) {
          return console.log(err.message);
        }
        // get the last insert id
        console.log(`A row has been inserted with rowid ${this.lastID}`);
    });
};

//создаём таблицу если она не была создана, внутри заносим нужные данные
db.run(`CREATE TABLE IF NOT EXISTS USERS (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            resource_id VARCHAR,
            token VARCHAR, 
            path VARCHAR
        );`,
  (err, row) => {
      if (err) {   
        console.error(err.message);
      }
      addToDB('test_resource_id_1', 'path_1');
      addToDB('test_resource_id_2', 'path_2');
      addToDB('test_resource_id_3', 'path_3');
    }
);

//выводим данные для отладки
db.serialize(() => {
    db.each(`SELECT resource_id as id, path as path FROM USERS`, (err, row) => {
      if (err) {   
        console.error(err.message);
      }
      console.log(row.id + "\t" + row.path);
    });
  }); 

// закрываем соединение с базой данных
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });



// console.log(db);
module.exports = function (req, res, next) {
    // console.log(req);
    console.log(res);
    
	res.end('cunt')
	next();
}

// db.createTable('USERS', {
//   id: { type: 'int', primaryKey: true, autoIncrement: true },
//   resource_id: 'string',
//   token: 'string',
//   path: 'string'
//   }
// );