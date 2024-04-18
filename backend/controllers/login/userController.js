const db = require('../../Database/db');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const salt = 10;

// User registration controller
exports.registerUser = async (req, res) => {

    const { name, email, password, contactNumber } = req.body;
    console.log("name", name);
    console.log("email", email);
    console.log("password", password);
    console.log("contactNumber", contactNumber);

    try {
        if (!name || !email || !password || !contactNumber) {
            return res.status(400).json({ error: "Name, email, password,and contactNumber are required." });
        }

        const hash = await bcrypt.hash(password.toString(), salt);
        console.log("Hash", hash);

        const sql = 'INSERT INTO login (`name`,`email`,`password`,`contactNumber`) VALUES (?,?,?,?)';
        const values = [name, email, hash, contactNumber];

        console.log("SQL",sql);
        console.log("val",values);

        db.query(sql, values, (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json({ error: "Error inserting data into database" });
            }
            return res.json({ status: "Success" });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error processing request" });
    }
};

// User login controller
exports.loginUser = async (req, res) => {


    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
    }

    const sql = 'SELECT * FROM login WHERE email = ?';
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
};

// User logout controller
exports.logoutUser = async (req,res) => {
    res.clearCookie('token'); 
    res.json({ status: "Success" });
};

// User profile controller
exports.getUserProfile = async (req, res) => {


    const token = req.cookies.token; 

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, "jwt-secret-key", (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const { name, email } = decoded;

    res.json({ name, email });
  });
};

//Tracking Order

exports.trackorder =async (req,res) => {
    const { Id } = req.params;

  db.query(
    'SELECT * FROM orders WHERE Id = ?',
    [Id],
    (error, results) => {
      if (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ error: 'An error occurred while fetching the order' });
      } else if (results.length === 0) {
        res.status(404).json({ error: 'Order not found' });
      } else {
        const order = results[0];
        res.status(200).json(order);
      }
    }
  );
}
module.exports = exports;
