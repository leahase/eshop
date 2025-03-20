import dotenv from "dotenv";
import express from "express";
import {connectDB} from "./config/db";
import cors from "cors";

dotenv.config();
const app = express();

// Middleware
app.use(express.json())
app.use(cors())

const stripe = require('stripe')('sk_test_4QHS9UR02FMGKPqdjElznDRI')

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:4242/success',
    cancel_url: 'http://localhost:4242/cancel',
  });

  res.redirect(303, session.url);
});


// Routes
import productRouter from "./routes/products";
import customerRouter from "./routes/customers";
import orderRouter from "./routes/orders";
import orderItemRouter from "./routes/orderItems";
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
