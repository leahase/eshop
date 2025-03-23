import dotenv from "dotenv";
import express, { Request, Response } from "express";
import {connectDB, db} from "./config/db";
import cors from "cors";
import { ResultSetHeader } from "mysql2";


// "id": "cs_test_a1uIyo5ec4OJtG0wzegE1E1D4Z9m419NJNIhOECyTCdzwSDnSC2Pp2epon"


dotenv.config();
const app = express();

// Middleware
app.use(express.json())
app.use(cors())

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post("/create-checkout-session", async (req: Request, res: Response) => {
  try {
    const { cart, customer } = req.body;

    if (!cart || cart.length === 0 ) {
      return res.json({error:"empty cart}"});
  }
  const [rows] = await db.query<ICustomer[]>("SELECT * FROM customers WHERE email = ?", [customer.email]);
  let customer_id;

  if (rows.length > 0) {
    customer_id = rows[0].id;
    console.log('customer exists already', customer.email);
  } else {
    const [result] = await db.query<ResultSetHeader>(
      `INSERT INTO customers (firstname, lastname, email, phone, street_address, postal_code, city, country)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        customer.firstname,
        customer.lastname,
        customer.email,
        customer.phone,
        customer.street_address,
        customer.postal_code,
        customer.city,
        customer.country,
      ]
    );
    customer_id = result.insertId;
    console.log('customer created', customer.email);
  }
  const totalPrice = cart.reduce((sum, item) => sum + item.quantity * item.product.price, 0);

    const [orderResult] = await db.query<ResultSetHeader>(
      `INSERT INTO orders (customer_id, total_price, payment_status, payment_id, order_status)
       VALUES (?, ?, 'Unpaid', '', 'Pending')`,
      [customer_id, totalPrice]
    );

    const order_id = orderResult.insertId;
    console.log('order created', order_id);

    for (const item of cart) {
      if (!item.product || !item.product.name || !item.product.price) {
        throw new Error("something is wrong");
      }

      await db.query(
        `INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price)
         VALUES (?, ?, ?, ?, ?)`,
        [order_id, item.product.id, item.product.name, item.quantity, item.product.price]
      );
    }
    const line_items = cart.map((item: any) => (
        {
          price_data: {
            currency: '€',
            product_data: {
              name: item.product.name,
            },
            unit_amount: item.product.price * 100,
          },
          quantity: item.quantity,
    }))

    const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    success_url: 'http://localhost:5173/confirmation?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'http://localhost:5173/checkout',
    client_reference_id: String(order_id),
  });

  if (!session.url) {
    console.error(Error);
    return res.json({ error: "checkout failed" });
  }
  await db.query(`UPDATE orders SET payment_id = ? WHERE id = ?`, [session.id, order_id]);
  console.log('order updated', session.id);

  res.json({checkout_url: session.url});
} catch (error) {
console.log(error);
}
  // res.redirect(303, session.url);
});


// Routes
import productRouter from "./routes/products";
import customerRouter from "./routes/customers";
import orderRouter from "./routes/orders";
import orderItemRouter from "./routes/orderItems";
import { ICustomer } from "./models/ICustomer";
app.use('/products', productRouter)
app.use('/customers', customerRouter)
app.use('/orders', orderRouter)
app.use('/order-items', orderItemRouter)


// Attempt to connect to the database
connectDB()
// Start Express server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`The server is running at http://localhost:${PORT}`);
})
