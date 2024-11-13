import express from 'express';
import axios from 'axios';
import { getOrders, getOrder, createOrder } from './database.js';
import bodyParser from 'body-parser';

var jsonParser = bodyParser.json();
// var urlencodedParser = bodyParser.urlencoded({ extended: false });

const app = express();

app.get("/orders", async (req, res) => {
    const orders = await getOrders();
    res.send(orders);
})

app.get("/orders/:orderId", async (req, res) => {
    const [order] = await getOrder(req.params.orderId);
    res.send(order);
})

// app.get("/getOrders", async (req, res) => {
//     const response = await axios.get("http://localhost:8080/orders");
//     res.send(response.data);
// })

app.post("/createOrder", jsonParser, async (req, res) => {
    const result = await createOrder(req.body);
    res.send(result);
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
})

app.listen(8080, () => {
    console.log('Server is running on port 8080');
})