import Cookies from "cookies"; 
import Axios from "axios";
const crypto = require('crypto');

export default async function checkAuth(context) {         
    if (process.client) {   
        return;
    }
    //вызываем новый инстанс класса Кукис и передаем в него реквест и респонс контекста
    //который является нукстовской обёрткой ноды
    const cookies = new Cookies(context.req, context.res)
    //проверяем наличие куки с именем "токен", если его нет редиректим на страницу логина чтобы 
    //чтобы получить токен и создать кукис
    // также синтаксически нужно добавить контекст стору
    const isAuthCook = cookies.get('token');
    
    await context.store.commit('SET_TOKEN', isAuthCook);
    
    if (!isAuthCook) {
        return context.redirect('/login'); 
    }
    //функция шифрования
    const hash = crypto
        .createHash('md5')
        .update(isAuthCook)
        .digest('hex');
    //проверяем есть ли авторизация пользователя по токену  
    const checkUser = await Axios({
        method: 'get',
        url: 'http://localhost:3003/api/in/users',
        withCredentials: true,
        params: {
            access_token: hash
        },
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        }      
    }); 
    
    await context.store.dispatch('UPDATE_USER', checkUser.data[0]);
    //если нет пути, редиректим на страницу пути
    if (checkUser.data[0].path === null) {
        await context.redirect('/folder-select');
    }
    //если пользователя нет, редиректим на страницу логина для авторизации
    if (checkUser.data.length === 0) {
        return context.redirect('/login'); 
    }
    
}    