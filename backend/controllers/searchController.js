const db = require('../Database/db');

exports.searchproducts = async (req,res) => {
  const { query: searchQuery } = req.query;

  try {
    const connection = await db.getConnection();

    const sql = `
      SELECT * FROM mobile_products
      WHERE name LIKE '%${searchQuery}%'
      UNION
      SELECT * FROM laptop_products
      WHERE name LIKE '%${searchQuery}%'
      UNION
      SELECT * FROM smartwatch_products
      WHERE name LIKE '%${searchQuery}%'
    `;

    const [results] = await connection.query(sql);
    connection.release();

    res.json(results);
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = exports;

{/**
exports.searchproducts = async (req,res) => {
  try {
    const { query } = req.query; // Extract the search query from the request query parameters

    // Perform product search based on the query (example implementation)
    const searchResults = await searchProducts(query);

    res.json(searchResults); // Send the search results as JSON response
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ error: 'Internal server error' }); // Handle errors gracefully
  }
};

// Example function for product search (replace with your actual search logic)
async function searchProducts(query) {
  // Example search logic (replace with your actual search implementation)
  // This is just a placeholder example, replace it with your actual search logic
  const sql = `SELECT * FROM mobile_products WHERE name LIKE ?`; // Assuming 'products' is your database table
  const searchQuery = `%${query}%`; // Construct the search query with wildcards
  return new Promise((resolve, reject) => {
    db.query(sql, [searchQuery], (err, results) => {
      if (err) {
        reject(err);
      } else {
        // Convert BLOB data to base64 string if needed
        const products = results.map(product => ({
          ...product,
          image: product.image.toString('base64'), // Convert image data to base64 if necessary
        }));
        resolve(products);
      }
    });
  });
}


exports.searchproducts1 = async (req,res) => {
  const { searchQuery } = req.query;
  const sql = `
    SELECT * FROM mobile_products
    WHERE name LIKE '%${searchQuery}%'
    UNION
    SELECT * FROM laptop_products
    WHERE name LIKE '%${searchQuery}%'
    UNION
    SELECT * FROM smartwatch_products
    WHERE name LIKE '%${searchQuery}%'
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      res.status(500).json({ error: 'Error fetching products' });
      return;
    }
    res.json(results);
  });
};

*/}