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
    const [rows] = await pool.query("SELECT * FROM orders");
    return rows;
}

export async function getOrder(orderId) {
    const [rows] = await pool.query("SELECT * FROM orders WHERE order_id = ?", [orderId]);
    return rows;
}