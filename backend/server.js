const express = require('express');
const mysql2 = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();



//Login Register Profile Logout
const userRoutes = require('./Routes/login/userRoutes');

//Admin Login
const adminRoutes = require('./Routes/login/adminRoutes')

//All Products
const productRoutes = require('./Routes/product/productRoutes')

const mobileProductsRoute = require('./Routes/mobileProductsRoutes');

const searchRoutes = require('./Routes/searchRoutes');



app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ["POST", "GET" , "DELETE"],
    credentials: true
}));
app.use(cookieParser());

const db = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "sai@163",
    database: "login_crud"
});


app.use(userRoutes);
app.use(adminRoutes);
app.use(productRoutes);
app.use(mobileProductsRoute);
app.use(searchRoutes);



app.post('/api/orders', (req, res) => {
  const { name, Address,contactNumber, paymentMethod, products, total, email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required for placing the order' });
  }

  db.query(
    'INSERT INTO orders (name, Address,contactNumber, paymentMethod, products, total, email) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [name, Address,contactNumber, paymentMethod, products, total, email],
    (error, results) => {
      if (error) {
        console.error('Error inserting order:', error);
        res.status(500).json({ error: 'An error occurred while placing the order' });
      } else {
        res.status(201).json({ message: 'Order placed successfully', orderId: results.insertId });
      }
    }
  );
});

app.get('/api/orders', (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: 'Email parameter is required' });
  }

  db.query(
    'SELECT * FROM orders WHERE email = ?',
    [email],
    (error, results) => {
      if (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'An error occurred while fetching orders' });
      } else {
        res.status(200).json(results);
      }
    }
  );
});




app.get('/api/users', (req, res) => {
  
  db.query(
    'SELECT * FROM login',
    (error, results) => {
      if (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'An error occurred while fetching users' });
      } else {
        res.status(200).json(results);
      }
    }
  );
});


app.put('/api/users/:userId', (req, res) => {
  const userId = req.params.userId;
  const { name, email } = req.body;

  db.query(
    'UPDATE login SET name = ?, email = ? WHERE id = ?',
    [name, email, userId],
    (error, results) => {
      if (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'An error occurred while updating user' });
      } else {
        res.status(200).json({ message: 'User updated successfully' });
      }
    }
  );
});


app.delete('/api/users/:userId', (req, res) => {
  const userId = req.params.userId;

  db.query(
    'DELETE FROM login WHERE id = ?',
    [userId],
    (error, results) => {
      if (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'An error occurred while deleting user' });
      } else {
        res.status(200).json({ message: 'User deleted successfully' });
      }
    }
  );
});


app.get('/orders',(req,res) =>{
  db.query('SELECT * FROM orders', (error, results) => {
    if (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ error: 'An error occurred while fetching orders' });
    } else {
      res.status(200).json(results);
    }
  });
})




app.listen(5001, () => {
    console.log('SERVER RUNNING AT PORT 5001');
});
