import Axios from "axios";
import qs from "qs";
import url from "url"; 
import { Database } from 'sqlite3';
// import sqlite3 from 'sqlite3';
// sqlite3.verbose();
// const sqlite3 = require('sqlite3').verbose();

// по сути весь мидлвэр это бэкенд на ноде
export default async function authCallback (req, res, next) {
    const code = url.parse(req.url,true).query.code

    // получаем токен у Яндекса
    // в случае с Гугл достаточно просто передать JSON внутри даты, но для яндекса необходимо
    // привести к строке методом qs.stringify()
    const result = await Axios({
        method: 'post',
        url: 'https://oauth.yandex.ru/token',
        withCredentials: true,
        data: qs.stringify({
            code: code,
            client_id: 'e8f66732424a4faba3aa58f46833a9d0',
            client_secret: '85c9f8f3851049b797077e9b2289d095',
            // redirect_uri: 'http://localhost:3000/auth-callback',
            grant_type: 'authorization_code'
        }),
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        }
    });
    
    console.log(result);
    
    //кладём токен в куки
    // context.res.setHeader() соответствует http.response.setHeader() с node.js
    // по сути является обёрткой, подробнее https://nuxtjs.org/api/context#-code-res-code-a-href-https-nodejs-org-api-http-html-http_class_http_serverresponse-em-http-response-em-a-
    await res.setHeader('Set-Cookie', `token=${result.data.access_token}; max-age=${result.data.expires_in}; httponly`);

    // await store.dispatch('setToken', isAuthCook)
    // return context.redirect('/folder-select'); 
    res.writeHead(302, {
        'Location': '/folder-select'
      });
    res.end();
}