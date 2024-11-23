import express from 'express';
import axios from 'axios';
import { getOrders, getOrder, createOrder, createAddress, getAddresses, getAddress } from './database.js';
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
    const resultDelivery = await axios.post(`https:localhost:8081/api/v1/delivery/${orderId}/assign`);
    res.send([result, resultDelivery]);
    // res.send(result);
})

app.post("/createAddress", jsonParser, async (req, res) => {
    const result = await createAddress(req.body);
    res.send(result);
})

app.get("/addresses/:userId", async (req, res) => {
    const addresses = await getAddress(req.params.userId);
    res.send(addresses);
})

app.get("/addresses", async (req, res) => {
    const addresses = await getAddresses();
    res.send(addresses);
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
})

app.listen(8080, () => {
    console.log('Server is running on port 8080');
})