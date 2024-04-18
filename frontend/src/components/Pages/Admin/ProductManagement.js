import React, { useState, useEffect } from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import axios from 'axios';
import { IconEdit, IconTrash } from '@tabler/icons-react';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [lapproducts, setlapProducts] = useState([]);
  const [swproducts, setswProducts] = useState([]);

  const [successMessage, setSuccessMessage] = useState('');
  const [refreshPage, setRefreshPage] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/mobile-products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [refreshPage]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/laptop-products');
        setlapProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [refreshPage]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/smartwatch-products');
        setswProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [refreshPage]);

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5001/api/mobile-products/${productId}`);
      setProducts(products.filter(product => product.id !== productId));
      setSuccessMessage('Product deleted successfully');
      setRefreshPage(true);
      console.log('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      console.error('Product name cannot be empty');
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('image', formData.image);

      await axios.post('http://localhost:5001/added-mobile-products', formDataToSend);
      setSuccessMessage('Product created successfully');
      setRefreshPage(true);
      console.log('Product created successfully');
      setFormData({ name: '', description: '', price: '', image: null });
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        setSuccessMessage('');
        setRefreshPage(false);
      }, 3000);
    }
  }, [successMessage]);

  return (
    <div>
      <h2>Product Management</h2>
      <Table striped bordered hover style={{marginBottom:'50px'}}>
        <thead>
          <h2>Mobile</h2>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>
                <Button variant="danger" onClick={() => deleteProduct(product.id)} style={{width:'fit-content'}}><IconTrash /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Table striped bordered hover style={{marginBottom:'50px'}}>
        <thead>
          <h2>Laptop</h2>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {lapproducts.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>
                <Button variant="danger" onClick={() => deleteProduct(product.id)} style={{width:'fit-content'}}><IconTrash /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Table striped bordered hover style={{marginBottom:'50px'}}>
        <thead>
          <h2>Smart Watch</h2>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {swproducts.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>
                <Button variant="danger" onClick={() => deleteProduct(product.id)} style={{width:'fit-content'}}><IconTrash /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h3>Add New Product</h3>
      <Form onSubmit={handleSubmit} style={{marginBottom:'50px'}}>
        <Form.Group controlId="productName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="productDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="productPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="productImage">
          <Form.Label>Image</Form.Label>
          <Form.Control type="file" name="image" onChange={handleChange} accept="image/*" />
        </Form.Group>
        <Button type="submit" style={{width:'fit-content', marginTop:'10px',marginLeft:'1000px'}}>Add Product</Button>
      </Form>
      {successMessage && <div className="success-message">{successMessage}</div>}
    </div>
  );
};

export default ProductManagement;
