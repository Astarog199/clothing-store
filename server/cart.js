const add = (cart, req) => {
    cart.contents.push(req.body);
    return { name: req.body.title, newCart: JSON.stringify(cart, null, 4) };
};

/**
 * метод удаления товара из корзины
 * @param {*} req  объект о котором хранится информация о запросе (request)
 * @param {*} cart корзина
 * @returns {{newCart: *, name: *}}
 */
const remove = (req, cart) => {
    const find = cart.contents.find(el => el.id === +req.params.id);
    cart.contents.splice(cart.contents.indexOf(find), 1);
    return { name: find.title, newCart: JSON.stringify(cart, null, 4) };
}

const change = (cart, req) => {
    const find = cart.contents.find(el => el.id === +req.params.id);
    find.quantity += req.body.quantity;
    return { name: find.title, newCart: JSON.stringify(cart, null, 4) };
};

module.exports = {
    add,
    change,
    remove,
};