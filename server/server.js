const express = require('express'); //подключаем модуль express
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express(); //записываем в переменную основные методы express
app.use(bodyParser.json());

app.use(express.json());
app.use('/', express.static('./public'));

/**
 * @param req объект о котором хранится информация о запросе (request)
 * @param res объект о котором хранится информация о ответе (response)
 * @method get будем использовать для получения списка товаров и содержимого корзины, 
 * @method post – для помещения товара в корзину и удаления товара из корзины. 
 * @method send метод отправляет res
 * Когда браузер пришлёт запрос на /api/users, в ответ ему вернётся содержимое файла users.json.
 */


app.get('/api/katalog', (req, res) => {
    fs.readFile('./server/db/catalogDATA.json', 'utf-8', (err, data) => {
        if (err) res.send({ result: 0, text: err });
        else res.send(data);
    });
});

app.get('/api/cart', (req, res) => {
    fs.readFile('./server/db/getBasket.json', 'utf-8', (err, data) => {
        if (err) res.send({ result: 0, text: err });
        else res.send(data);
    });
});

app.post('/api/cart', (req, res) => {
    fs.readFile('./server/db/getBasket.json', 'utf-8', (err, data) => {
        if (err) res.send({ result: 0, text: err });
        else {
            const cart = JSON.parse(data);
            cart.contents.push(req.body);

            fs.writeFile('./server/db/getBasket.json', JSON.stringify(cart), (err) => {
                if (err) res.send({ result: 0, text: err });
                else res.send({ result: 1 });
            });
        }
    });
});

app.delete('/api/cart', (req, res) => {
    fs.readFile('./server/db/getBasket.json', 'utf-8', (err, data) => {
        if (err) res.send({ result: 0, text: err });
        else {
            const cart = JSON.parse(data);
            cart.contents.splice(req.body);

            fs.writeFile('./server/db/getBasket.json', JSON.stringify(cart), (err) => {
                if (err) res.send({ result: 0, text: err });
                else res.send({ result: 1 });
            });
        }
    });
});

app.put('/api/cart/:id', (req, res) => {
    fs.readFile('./server/db/getBasket.json', 'utf-8', (err, data) => {
        if (err) res.send({ result: 0, text: err });
        else {
            const cart = JSON.parse(data);
            const find = cart.contents.find((good) => {
                return good.id === +req.params.id;
            });
            find.quantity += req.body.quantity;

            fs.writeFile('./server/db/getBasket.json', JSON.stringify(cart, null), (err) => {
                if (err) {
                    res.send({ result: 0, text: err })
                    res.sendStatus(404, JSON.stringify({ result: 0, text: err }))
                } else res.send({ result: 1 });
            });
        }
    });
});

/**
 * метод принимает номер порта, на котором создаётся сервер
 */

app.listen(3000, () => {
    console.log('server is running on port 3000!');
});