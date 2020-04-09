import Cookies from "cookies"; 

export default async function hasToken(context) {
    //вызываем новый инстанс класса Кукис и передаем в него реквест и респонс контекста
    //который является нукстовской обёрткой ноды
    const cookies = new Cookies(context.req, context.res)

    //проверяем наличие куки с именем "токен", если его нет редиректим на страницу логина чтобы 
    //чтобы получить токен и создать кукис
    // добавить контекст стору
    const isAuthCook = cookies.get('token');
    
    await context.store.commit('SET_TOKEN', isAuthCook);
    
    if (!isAuthCook) {
        return context.redirect('/login'); 
    }

}    