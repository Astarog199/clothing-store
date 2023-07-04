const express = require('express'); //подключаем модуль express
const bodyParser = require('body-parser');
const fs = require('fs');
const cartRouter = require('./cartRouter');
const app = express(); //записываем в переменную основные методы express
const path = require('path');

app.use(bodyParser.json());
app.use(express.json());
app.use('/', express.static(path.resolve(__dirname, '../public')));
app.use('/api/cart', cartRouter);

/**
 * @param req объект о котором хранится информация о запросе (request)
 * @param res объект о котором хранится информация о ответе (response)
 * @method get будем использовать для получения списка товаров и содержимого корзины, 
 * @method post – для помещения товара в корзину и удаления товара из корзины. 
 * @method send метод отправляет res
 * Когда браузер пришлёт запрос на /api/users, в ответ ему вернётся содержимое файла users.json.
 */

const catalogJSONPath = path.resolve(__dirname, './db/catalogDATA.json');

app.get('/api/katalog', (req, res) => {
    fs.readFile(catalogJSONPath, 'utf-8', (err, data) => {
        if (err) res.send(JSON.stringify({ result: 0, text: err }));
        else res.send(data);
    });
});

/**
 * метод принимает номер порта, на котором создаётся сервер
 */

app.listen(3000, () => {
    console.log('server is running on port 3000!');
});