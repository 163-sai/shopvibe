const db = require('../../Database/db'); 


//Mobile 

exports.getAllMobileProducts = (req, res) => {
  try {
      db.query('SELECT * FROM mobile_products', (err, results) => {
          if (err) {
              console.error(err);
              return res.status(500).json({ error: 'Internal server error' });
          }
          // Convert BLOB data to base64 string
          const products = results.map(product => ({
              ...product,
              image: product.image.toString('base64'),
              add_image: product.add_image ? product.add_image.toString('base64') : null,
          }));
          res.json(products);
      });
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error fetching products' });
  }
};


exports.getMobileProductById = (req, res) => {
  const productId = req.params.productId;
  const sql = 'SELECT *, GROUP_CONCAT(image) as add_images FROM mobile_products WHERE id = ?';
  db.query(sql, [productId], (err, result) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal server error' });
      }
      if (result.length === 0) {
          return res.status(404).json({ error: 'Product not found' });
      }
      const product = result[0];
      product.image = product.image.toString('base64');
      if (typeof product.add_images === 'string') {
          product.add_images = product.add_images.split(',').map(img => img.toString('base64'));
      }
      res.json(product);
  });
};


//Laptop


exports.getAllLaptopProducts = (req, res) => {
    try {
        db.query('SELECT * FROM laptop_products', (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            // Convert BLOB data to base64 string
            const products = results.map(product => ({
                ...product,
                image: product.image.toString('base64'),
            }));
            res.json(products);
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error fetching products' });
    }
};

exports.getLaptopProductById = (req, res) => {
    const productId = req.params.productId;
    const sql = 'SELECT * FROM laptop_products WHERE id = ?';
    db.query(sql, [productId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        const product = result[0];
        product.image = product.image.toString('base64');
        res.json(product);
    });
};

//Smartwatch


exports.getAllSmartwatchProducts = (req, res) => {
    try {
        db.query('SELECT * FROM smartwatch_products', (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            // Convert BLOB data to base64 string
            const products = results.map(product => ({
                ...product,
                image: product.image.toString('base64'),
            }));
            res.json(products);
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error fetching products' });
    }
};

exports.getSmartwatchProductById = (req, res) => {
    const productId = req.params.productId;
    const sql = 'SELECT * FROM smartwatch_products WHERE id = ?';
    db.query(sql, [productId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        const product = result[0];
        product.image = product.image.toString('base64');
        res.json(product);
    });
};

//Men

exports.getAllMenFashion = (req,res) => {
    db.query('SELECT * FROM menfashion', (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal server error' });
        }
        // Convert BLOB data to base64 string
        const products = results.map(product => ({
          ...product,
          image: product.image.toString('base64'),
        }));
        res.json(products);
      });
}

exports.getAllMenFashionById = (req,res) => {
    const productId = req.params.productId;
    const sql = 'SELECT * FROM menfashion WHERE id = ?';
    db.query(sql, [productId], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      if (result.length === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }
      const product = result[0];
      product.image = product.image.toString('base64');
      res.json(product);
    });
}

//Women

exports.getAllWomenFashion = (req,res) => {
    db.query('SELECT * FROM womenfashion', (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal server error' });
        }
        // Convert BLOB data to base64 string
        const products = results.map(product => ({
          ...product,
          image: product.image.toString('base64'),
        }));
        res.json(products);
      });
}

exports.getAllWomenFashionById = (req,res) => {
    const productId = req.params.productId;
    const sql = 'SELECT * FROM womenfashion WHERE id = ?';
    db.query(sql, [productId], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      if (result.length === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }
      const product = result[0];
      product.image = product.image.toString('base64');
      res.json(product);
    });
}


//Kid

exports.getAllKidFashion = (req,res) => {
    db.query('SELECT * FROM kidfashion', (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal server error' });
        }
        // Convert BLOB data to base64 string
        const products = results.map(product => ({
          ...product,
          image: product.image.toString('base64'),
        }));
        res.json(products);
      });
}

exports.getAllKidFashionById = (req,res) => {
    const productId = req.params.productId;
    const sql = 'SELECT * FROM kidfashion WHERE id = ?';
    db.query(sql, [productId], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      if (result.length === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }
      const product = result[0];
      product.image = product.image.toString('base64');
      res.json(product);
    });
}

// Top Selling Products

exports.getTopSellingProducts = (req,res) => {
    db.query('SELECT * FROM topsellingproducts', (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal server error' });
        }
        // Convert BLOB data to base64 string
        const products = results.map(product => ({
          ...product,
          image: product.image.toString('base64'),
        }));
        res.json(products);
      });
}

exports.getTopSellingProductsById = (req,res) => {
    const productId = req.params.productId;
    const sql = 'SELECT * FROM topsellingproducts WHERE id = ?';
    db.query(sql, [productId], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      if (result.length === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }
      const product = result[0];
      product.image = product.image.toString('base64');
      res.json(product);
    });
}

//Offer Products

exports.getOfferProducts = (req,res) => {
  db.query('SELECT * FROM offerproducts', (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      // Convert BLOB data to base64 string
      const products = results.map(product => ({
        ...product,
        image: product.image.toString('base64'),
      }));
      res.json(products);
    });
}

module.exports = exports;
