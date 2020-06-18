const http = require('http');
const url = require('url');
const port = 3003;
const crypto = require('crypto');
const sqlite3 = require('sqlite3').verbose();
const {open} = require('sqlite');

async function requestHandler (request, response) {
    try {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "*");
        response.setHeader("Access-Control-Allow-Headers", "*");
        // Открываем соединение с базой данных
        const db = await open({
            filename: 'testDB.db',
            driver: sqlite3.Database
        })
        console.log('Connected to the USERS SQlite database.');
        console.log(db);
        //парсим url
        const urlParts = url.parse(request.url, true);
        //функция шифрования
        // const hashToken = (secret) => {
        //     crypto
        //     .createHash('md5')
        //     .update(secret)
        //     .digest('hex');
        // };
        
        // обрабатываем метод GET из authCallback serverMiddleware
        if (urlParts.pathname === "/api/in/users" && request.method === "GET" && Boolean(urlParts.query.resource_id)) {
            console.log('GET request from authCallback serverMiddleware has been recieved');      
            try {
                //создаем асинхронный запрос к базе данных и передаем ответ
                const result = await db.all(`SELECT id, resource_id, token, path FROM users WHERE "resource_id"=$resource_id`, 
                {$resource_id: urlParts.query.resource_id}); 
                console.log(result);
                response.writeHead(200, {'Content-Type': 'application/json'});
                response.end(JSON.stringify(result));
            } 
            catch(err) {
                console.log(err);
            }
        } 
        // обрабатываем метод GET из checkAuth middleware
        if (urlParts.pathname === "/api/in/users" && request.method === "GET" && Boolean(!urlParts.query.resource_id)) {
            console.log('GET request from checkAuth middleware has been recieved');      
            try { 
                //создаем асинхронный запрос к базе данных и передаем ответ
                const result = await db.all(`SELECT id, resource_id, token, path FROM users WHERE "token"=$access_token`, 
                {$access_token: urlParts.query.access_token}); 
                console.log(result[0]);
                response.writeHead(200, {'Content-Type': 'application/json'});
                response.end(JSON.stringify(result));
            } 
            catch(err) {
                console.log(err);
            }
        }
        // обрабатываем метод POST
        if (urlParts.pathname === "/api/in/users" && request.method === "POST") {
            console.log('POST request has been recieved');      
            try {
                //шифруем access_token
                const hash = crypto
                .createHash('md5')
                .update(urlParts.query.access_token)
                .digest('hex');
                
                //создаем асинхронный запрос к базе данных и передаем ответ, предварительно подготавливая sql запрос методом prepare
                const stmt = await db.prepare(`INSERT INTO users(resource_id, token) VALUES("${urlParts.query.resource_id}", "${hash}")`);
                const result = await stmt.run(); 
                console.log(result);
                response.writeHead(201, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
                response.end();
            } 
            catch(err) {
                console.log(err);
            }
        }
        // ----------------------------ПУБЛИЧНОЕ API------------------------------------
        // обрабатываем метод GET
        if (urlParts.pathname === "/api/users" && request.method === "GET") {
            console.log('GET request from VUEX store has been recieved');            
            try { 
                //создаем асинхронный запрос к базе данных и передаем ответ
                const result = await db.all(`SELECT id, resource_id, token, path FROM users WHERE "id"=$id`, 
                {$id: urlParts.query.id}); 
                console.log(result);
                response.writeHead(200, {'Content-Type': 'application/json'});
                response.end(JSON.stringify(result));
            } 
            catch(err) {
                console.log(err);
            }
        }
        // обрабатываем метод PATCH
        if (urlParts.pathname === "/api/users" && request.method === "PATCH") {
            console.log('PATCH request has been recieved');      
            try {         
                // создаем асинхронный запрос к базе данных и передаем ответ, предварительно подготавливая sql запрос методом prepare
                const stmt = await db.prepare(`UPDATE users SET path="${urlParts.query.path}" WHERE id="${urlParts.query.id}"`);
                const result = await stmt.run(); 
                console.log(result);
                response.writeHead(200, {'Content-Type': 'application/json'});
                return response.end();               
            } 
            catch(err) {
                console.log(err);
            }
        }         
    }
    catch (err) {
        console.log(err);
        response.writeHead(501, {'Content-Type': 'application/json'});
        response.end("Error: cannot connect to Database");
    }
    response.end(console.log('Response is over'));
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }
    console.log(`server is listening on ${port}`);
})
