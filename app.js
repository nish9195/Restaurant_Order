import express from 'express';
import { getOrders, getOrder } from './database.js';

const app = express();

app.get("/orders", async (req, res) => {
    const orders = await getOrders();
    res.send(orders);
})

app.get("/orders/:orderId", async (req, res) => {
    const orders = await getOrders();
    res.send(orders);
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
})

app.listen(8080, () => {
    console.log('Server is running on port 8080');
})