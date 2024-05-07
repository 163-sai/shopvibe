const db = require('../Database/db');



exports.deletemobileProduct = async (req, res) => {
    const productId = req.params.id;

  try {
    const deleteQuery = 'DELETE FROM mobile_products WHERE id = ?';
    await db.query(deleteQuery, [productId]);

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'An error occurred while deleting the product' });
  }
}

exports.deletelaptopProduct = async (req, res) => {
  const productId = req.params.id;

try {
  const deleteQuery = 'DELETE FROM laptop_products WHERE id = ?';
  await db.query(deleteQuery, [productId]);

  res.status(200).json({ message: 'Product deleted successfully' });
} catch (error) {
  console.error('Error deleting product:', error);
  res.status(500).json({ error: 'An error occurred while deleting the product' });
}
}

exports.deletesmartwatchProduct = async (req, res) => {
  const productId = req.params.id;

try {
  const deleteQuery = 'DELETE FROM smartwatch_products WHERE id = ?';
  await db.query(deleteQuery, [productId]);

  res.status(200).json({ message: 'Product deleted successfully' });
} catch (error) {
  console.error('Error deleting product:', error);
  res.status(500).json({ error: 'An error occurred while deleting the product' });
}
}

exports.deletemenProduct = async (req, res) => {
  const productId = req.params.id;

try {
  const deleteQuery = 'DELETE FROM menfashion WHERE id = ?';
  await db.query(deleteQuery, [productId]);

  res.status(200).json({ message: 'Product deleted successfully' });
} catch (error) {
  console.error('Error deleting product:', error);
  res.status(500).json({ error: 'An error occurred while deleting the product' });
}
}

exports.deletewomenProduct = async (req, res) => {
  const productId = req.params.id;

try {
  const deleteQuery = 'DELETE FROM womenfashion WHERE id = ?';
  await db.query(deleteQuery, [productId]);

  res.status(200).json({ message: 'Product deleted successfully' });
} catch (error) {
  console.error('Error deleting product:', error);
  res.status(500).json({ error: 'An error occurred while deleting the product' });
}
}

exports.deletekidProduct = async (req, res) => {
  const productId = req.params.id;

try {
  const deleteQuery = 'DELETE FROM kidfashion WHERE id = ?';
  await db.query(deleteQuery, [productId]);

  res.status(200).json({ message: 'Product deleted successfully' });
} catch (error) {
  console.error('Error deleting product:', error);
  res.status(500).json({ error: 'An error occurred while deleting the product' });
}
}



exports.addmobileProduct = async (req, res) => {
    const { name, description, price } = req.body;
    const image = req.file ? req.file.path : ''; 
  
    if (!name || !description || !price || !image) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
    db.query(
      'INSERT INTO mobile_products (name, description, price, image) VALUES (?, ?, ?, ?)',
      [name, description, price, image],
      (error, results) => {
        if (error) {
          console.error('Error inserting product:', error);
          res.status(500).json({ error: 'An error occurred while creating the product' });
        } else {
          const fs = require('fs');
          const imageData = fs.readFileSync(req.file.path);
          const base64Image = Buffer.from(imageData).toString('base64');

          res.status(201).json({ 
            message: 'Product created successfully',
            productId: results.insertId,
            image: base64Image 
          });
        }
      }
    );
};

exports.addlaptopProduct = async (req, res) => {
  const { name, description, price } = req.body;
  const image = req.file ? req.file.path : ''; 

  if (!name || !description || !price || !image) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  db.query(
    'INSERT INTO laptop_products (name, description, price, image) VALUES (?, ?, ?, ?)',
    [name, description, price, image],
    (error, results) => {
      if (error) {
        console.error('Error inserting product:', error);
        res.status(500).json({ error: 'An error occurred while creating the product' });
      } else {
        const fs = require('fs');
        const imageData = fs.readFileSync(req.file.path);
        const base64Image = Buffer.from(imageData).toString('base64');

        res.status(201).json({ 
          message: 'Product created successfully',
          productId: results.insertId,
          image: base64Image 
        });
      }
    }
  );
};

exports.addsmartwatchProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const image = req.file ? req.file.path : ''; // Assuming 'image' field in the form is for uploading images

    // Insert new product into the database
    const result = await db.query('INSERT INTO smartwatch_products (name, description, price, image) VALUES (?, ?, ?, ?)', [name, description, price, image]);

    res.status(201).json({ message: 'Product added successfully', productId: result.insertId });
  } catch (error) {
    console.error('Error adding smartwatch product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.addmenProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const image = req.file ? req.file.path : ''; 

    const result = await db.query('INSERT INTO menfashion (name, description, price, image) VALUES (?, ?, ?, ?)', [name, description, price, image]);

    res.status(201).json({ message: 'Product added successfully', productId: result.insertId });
  } catch (error) {
    console.error('Error adding men product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.addwomenProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const image = req.file ? req.file.path : ''; 

    const result = await db.query('INSERT INTO womenfashion (name, description, price, image) VALUES (?, ?, ?, ?)', [name, description, price, image]);

    res.status(201).json({ message: 'Product added successfully', productId: result.insertId });
  } catch (error) {
    console.error('Error adding women product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.addkidProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const image = req.file ? req.file.path : ''; 

    const result = await db.query('INSERT INTO kidfashion (name, description, price, image) VALUES (?, ?, ?, ?)', [name, description, price, image]);

    res.status(201).json({ message: 'Product added successfully', productId: result.insertId });
  } catch (error) {
    console.error('Error adding kid product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};






module.exports = exports;