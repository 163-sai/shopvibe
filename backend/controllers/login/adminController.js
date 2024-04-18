const db = require('../../Database/db');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Admin login Controller
exports.loginAdmin = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
    }
  
    const sql = 'SELECT * FROM admin_login WHERE email = ?';
    db.query(sql, [email], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error querying database" });
        }
        if (data.length > 0) {
            bcrypt.compare(password.toString(), data[0].password, (err, response) => {
                if (err) {
                    return res.status(500).json({ error: "Error comparing passwords" });
                }
                if (response) {
                    const { name, email } = data[0];
                    const token = jwt.sign({ name, email }, "jwt-secret-key", { expiresIn: '1d' });
                    res.cookie('token', token);
                    return res.json({ status: "Success", name, email, token });
                } else {
                    return res.status(401).json({ error: "Wrong password" });
                }
            });
        } else {
            return res.status(404).json({ error: "Email does not exist" });
        }
    });
} 

//Sales
exports.Sales = async (req, res) => {
  const userId = req.query.user_id;
  const productIds = req.query.product_id;
  const startDate = req.query.start_date;
  const endDate = req.query.end_date;
  const minPrice = req.query.min_price;
  const maxPrice = req.query.max_price;

  let sql = 'SELECT * FROM ProductInsights WHERE 1'; 

  const queryParams = [];

  if (userId && userId !== 'All') {
    sql += ` AND user_id = ?`;
    queryParams.push(userId);
  }

  if (productIds && productIds !== 'All') {
    const productIdList = productIds.split(',');
    const placeholders = productIdList.map(() => '?').join(',');
    sql += ` AND product_id IN (${placeholders})`;
    queryParams.push(...productIdList);
  }

  if (startDate && endDate) {
    sql += ` AND purchase_datetime BETWEEN ? AND ?`;
    queryParams.push(startDate, endDate);
  }

  if (minPrice && maxPrice) {
    sql += ` AND price BETWEEN ? AND ?`;
    queryParams.push(minPrice, maxPrice);
  }

  db.query(sql, queryParams, (err, result) => {
    if (err) {
      console.error('Error fetching product insights:', err);
      res.status(500).send('Error fetching product insights');
    } else {
      res.send(result);
    }
  });
};

  
  


module.exports = exports;