import Axios from "axios";
import qs from "qs";
import url from "url"; 

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
      
    //кладём токен в куки
    // context.res.setHeader() соответствует http.response.setHeader() с node.js
    // по сути является обёрткой, подробнее https://nuxtjs.org/api/context#-code-res-code-a-href-https-nodejs-org-api-http-html-http_class_http_serverresponse-em-http-response-em-a-
    await res.setHeader('Set-Cookie', `token=${result.data.access_token}; max-age=${result.data.expires_in}; httponly`);
    //получаем resource_id
    const getResourceId = await Axios({
        method: 'get',
        url: 'https://cloud-api.yandex.net/v1/disk/resources',
        withCredentials: true,
        params: {
            path: '/',
            limit: '500'
        },
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'Authorization': `OAuth ${result.data.access_token}` 
            }
        })
        .then(response => {
            return response.data.resource_id;                   
        })
    //проверяем пользователя
    const checkUser = await Axios({
        method: 'get',
        url: 'http://localhost:3003/api/in/users',
        withCredentials: true,
        params: {
            resource_id: getResourceId,
            access_token: result.data.access_token
        },
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        }      
    });
    // console.log(checkUser.data);
    
    if (checkUser.data.length === 0) {
        const passData = await Axios({
            method: 'post',
            url: 'http://localhost:3003/api/in/users',
            withCredentials: true,
            params: {
                resource_id: getResourceId,
                access_token: result.data.access_token
            },
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            }
        })
        // console.log(passData.data);
    } 

    else {
        const patchData = await Axios({
            method: 'patch',
            url: 'http://localhost:3003/api/in/users',
            withCredentials: true,
            params: {
                resource_id: getResourceId,
                access_token: result.data.access_token
            },
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            }
        })    
    }
    // return context.redirect('/folder-select'); 
    res.writeHead(302, {
        'Location': '/'
      });
    res.end();
}