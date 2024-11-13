import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

export async function getOrders() {
    const [rows] = await pool.query("SELECT * FROM orders LEFT OUTER JOIN address ON orders.address_id = address.address_id");
    return rows;
}

export async function getOrder(orderId) {
    const [rows] = await pool.query("SELECT * FROM orders LEFT OUTER JOIN address ON orders.address_id = address.address_id WHERE order_id = ?", [orderId]);
    return rows;
}

export async function createOrder(order) {
    const orderResult = await pool.query("INSERT INTO orders (user_id, address_id, total_amount, delivery_partner_id, current_status_id) VALUES (?, ?, ?, ?, ?)", [order.userId, order.addressId, order.totalAmount, order.deliveryPartnerId, 0]);
    const orderId = orderResult[0].insertId;
    const orderItemsResult = [];
    for(let i=0; i<order.products.length; i++) {
        orderItemsResult[i] = await pool.query("INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)", [orderId, order.products[i].productId, order.products[i].quantity, order.products[i].price]);
    }
    return [orderResult, orderItemsResult];
}

// const order = {
//     userId: 3,
//     addressId: 3,
//     totalAmount: 300,
//     deliveryPartnerId: 3,
//     products: [
//         {
//             productId: 1,
//             quantity: 2,
//             price: 90
//         },
//         {
//             productId: 2,
//             quantity: 1,
//             price: 120
//         }
//     ]
// }

// const orderResult = await createOrder(order);
// console.log(orderResult);