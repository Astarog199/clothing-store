const add = (cart, req) => {
    cart.contents.push(req.body);
    cart.countGoods = cart.countGoods+1;
    cart.amount =cart.amount+req.body.price;
    return { name: req.body.title, newCart: JSON.stringify(cart, null, 4) };
};

/**
 * метод удаления товара из корзины
 * @param {*} req  объект о котором хранится информация о запросе (request)
 * @param {*} cart корзина
 * @returns {{newCart: *, name: *}}
 */
const remove = (cart, req) => {
    const find = cart.contents.find(el => el.id === +req.params.id);
    cart.contents.splice(cart.contents.indexOf(find), 1);
    cart.countGoods =cart.countGoods-1;
    cart.amount =cart.amount - find.price;
    return { name: find.title, newCart: JSON.stringify(cart, null, 4) };
}

const change = (cart, req) => {
    const find = cart.contents.find(el => el.id === +req.params.id);
    find.quantity += req.body.quantity;
    basket_value=0;
    cart.contents.forEach(element => {
        basket_value += element.quantity*element.price;
        cart.amount =basket_value;
    });
    
    return { name: find.title, newCart: JSON.stringify(cart, null, 4) };
};

module.exports = {
    add,
    change,
    remove,
};