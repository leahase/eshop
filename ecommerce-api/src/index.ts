import dotenv from "dotenv";
import express from "express";
import {connectDB} from "./config/db";
import cors from "cors";

// "id": "cs_test_a1uIyo5ec4OJtG0wzegE1E1D4Z9m419NJNIhOECyTCdzwSDnSC2Pp2epon"


dotenv.config();
const app = express();

// Middleware
app.use(express.json())
app.use(cors())

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'SEK',
          product_data: {
            name: 'Poster',
          },
          unit_amount: 5000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:5173/order/confirmation',
    cancel_url: 'http://localhost:5173/checkout',
    client_reference_id: '123',
  });



  res.json(session);

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
