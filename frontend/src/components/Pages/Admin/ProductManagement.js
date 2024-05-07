import React, { useState, useEffect } from 'react';
import { Button, Table, Form, Modal, Container } from 'react-bootstrap';
import axios from 'axios';
import { IconTrash } from '@tabler/icons-react';


const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [lapproducts, setlapProducts] = useState([]);
  const [swproducts, setswProducts] = useState([]);
  const [menproducts, setmenProducts] = useState([]);
  const [womenproducts, setwomenProducts] = useState([]);
  const [kidproducts, setkidProducts] = useState([]);

  const [successMessage, setSuccessMessage] = useState('');
  const [refreshPage, setRefreshPage] = useState(false);

  const [showAddMobileModal, setShowAddMobileModal] = useState(false);
  const [showAddLaptopModal, setShowAddLaptopModal] = useState(false);
  const [showAddSmartwatchModal, setShowAddSmartwatchModal] = useState(false);
  const [showAddMenModal, setShowAddMenModal] = useState(false);
  const [showAddWomenModal, setShowAddWomenModal] = useState(false);
  const [showAddKidModal, setShowAddKidModal] = useState(false);



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
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/menfashion');
        setmenProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [refreshPage]);
 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/womenfashion');
        setwomenProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [refreshPage]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/kidfashion');
        setkidProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [refreshPage]);

  const deleteProductmobile = async (productId) => {
    try {
      await axios.delete(`http://localhost:5001/api/mobile-products/${productId}`);
      setProducts(products.filter(product => product.id !== productId));
      setSuccessMessage('Product deleted successfully');
      setTimeout(() => {
        setRefreshPage(true);
      }, 1000); 
      console.log('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  
  const deleteProductlaptop = async (productId) => {
    try {
      await axios.delete(`http://localhost:5001/api/laptop-products/${productId}`);
      setlapProducts(lapproducts.filter(product => product.id !== productId));
      setSuccessMessage('Product deleted successfully');
      setTimeout(() => {
        setRefreshPage(true);
      }, 1000); 
      console.log('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  
  const deleteProductsmartwatch = async (productId) => {
    try {
      await axios.delete(`http://localhost:5001/api/smartwatch-products/${productId}`);
      setswProducts(swproducts.filter(product => product.id !== productId));
      setSuccessMessage('Product deleted successfully');
      setTimeout(() => {
        setRefreshPage(true);
      }, 1000); 
      console.log('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  
  const deleteProductmen = async (productId) => {
    try {
      await axios.delete(`http://localhost:5001/api/men-products/${productId}`);
      setmenProducts(menproducts.filter(product => product.id !== productId));
      setSuccessMessage('Product deleted successfully');
      setTimeout(() => {
        setRefreshPage(true);
      }, 1000); 
      console.log('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  const deleteProductwomen = async (productId) => {
    try {
      await axios.delete(`http://localhost:5001/api/women-products/${productId}`);
      setwomenProducts(womenproducts.filter(product => product.id !== productId));
      setSuccessMessage('Product deleted successfully');
      setTimeout(() => {
        setRefreshPage(true);
      }, 1000); 
      console.log('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  const deleteProductkid = async (productId) => {
    try {
      await axios.delete(`http://localhost:5001/api/kid-products/${productId}`);
      setkidProducts(kidproducts.filter(product => product.id !== productId));
      setSuccessMessage('Product deleted successfully');
      setTimeout(() => {
        setRefreshPage(true);
      }, 1000); 
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

  const handleSubmitmobile = async (e) => {
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
      setFormData({ name: '', description: '', price: '', image: null });
      setTimeout(() => {
        setRefreshPage(true);
      }, 1000); // Delay added to ensure the backend updates before refreshing
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };
  
  const handleSubmitlaptop = async (e) => {
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
  
      await axios.post('http://localhost:5001/added-laptop-products', formDataToSend);
      setSuccessMessage('Product created successfully');
      setFormData({ name: '', description: '', price: '', image: null });
      setTimeout(() => {
        setRefreshPage(true);
      }, 1000); // Delay added to ensure the backend updates before refreshing
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };
  
  const handleSubmitsmartwatch = async (e) => {
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
  
      await axios.post('http://localhost:5001/added-smartwatch-products', formDataToSend);
      setSuccessMessage('Product created successfully');
      setFormData({ name: '', description: '', price: '', image: null });
      setTimeout(() => {
        setRefreshPage(true);
      }, 1000); // Delay added to ensure the backend updates before refreshing
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };
 
  const handleSubmitmen = async (e) => {
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
  
      await axios.post('http://localhost:5001/added-men-products', formDataToSend);
      setSuccessMessage('Product created successfully');
      setFormData({ name: '', description: '', price: '', image: null });
      setTimeout(() => {
        setRefreshPage(true);
      }, 1000); 
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };
 
  const handleSubmitwomen = async (e) => {
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
  
      await axios.post('http://localhost:5001/added-women-products', formDataToSend);
      setSuccessMessage('Product created successfully');
      setFormData({ name: '', description: '', price: '', image: null });
      setTimeout(() => {
        setRefreshPage(true);
      }, 1000); 
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };
  const handleSubmitkid = async (e) => {
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
  
      await axios.post('http://localhost:5001/added-kid-products', formDataToSend);
      setSuccessMessage('Product created successfully');
      setFormData({ name: '', description: '', price: '', image: null });
      setTimeout(() => {
        setRefreshPage(true);
      }, 1000); 
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };
  

  return (
    <div style={{padding:'100px 0px'}}>
      <Container>
      <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
      <h1>Product Management</h1>
      <h2>Electronics</h2>
      </div>
      {successMessage && <div className="success-message">{successMessage}</div>}
      <Table striped bordered hover style={{padding:'10px 0px'}}>
        <thead>
          <h2 >Mobile</h2>
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
                <Button variant="danger" onClick={() => deleteProductmobile(product.id)} style={{width:'fit-content'}}><IconTrash /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
      <Button onClick={() => setShowAddMobileModal(true)} style={{width:'fit-content'}}>Add Mobile product</Button>
      </div>

      <hr style={{ margin: '20px 0' }} />


      <Table striped bordered hover style={{padding:'10px 0px'}}>
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
                <Button variant="danger" onClick={() => deleteProductlaptop(product.id)} style={{width:'fit-content'}}><IconTrash /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
<div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
      <Button onClick={() => setShowAddLaptopModal(true)} style={{width:'fit-content'}}>Add Laptop product</Button>
</div>

<hr style={{ margin: '20px 0' }} />

      <Table striped bordered hover style={{padding:'10px 0px'}}>
        <thead>
          <h2>SmartWatch</h2>
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
                <Button variant="danger" onClick={() => deleteProductsmartwatch(product.id)} style={{width:'fit-content'}}><IconTrash /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
      <Button onClick={() => setShowAddSmartwatchModal(true)} style={{width:'fit-content'}}>Add Smartwatch product</Button>
      </div>

      <hr style={{ margin: '20px 0' }} />
  
      <div style={{display:'flex',justifyContent:'center',alignItems:'center',padding:'20px'}}>
      <h2>Fashion</h2>       
      </div>
      <Table striped bordered hover style={{padding:'10px 0px'}}>
        <thead>
          <h2>Men</h2>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {menproducts.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>
                <Button variant="danger" onClick={() => deleteProductmen(product.id)} style={{width:'fit-content'}}><IconTrash /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
      <Button onClick={() => setShowAddMenModal(true)} style={{width:'fit-content'}}>Add Men product</Button>
      </div>

      <hr style={{ margin: '20px 0' }} />
   
      <Table striped bordered hover style={{padding:'10px 0px'}}>
        <thead>
          <h2>Women</h2>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {womenproducts.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>
                <Button variant="danger" onClick={() => deleteProductwomen(product.id)} style={{width:'fit-content'}}><IconTrash /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
      <Button onClick={() => setShowAddWomenModal(true)} style={{width:'fit-content'}}>Add Women product</Button>
      </div>
      <hr style={{ margin: '20px 0' }} />
      <Table striped bordered hover style={{padding:'10px 0px'}}>
        <thead>
          <h2>Kid</h2>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {kidproducts.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>
                <Button variant="danger" onClick={() => deleteProductkid(product.id)} style={{width:'fit-content'}}><IconTrash /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
      <Button onClick={() => setShowAddKidModal(true)} style={{width:'fit-content'}}>Add Kid product</Button>
      </div>
      <hr style={{ margin: '20px 0' }} />
      </Container>
      
      
      <Modal show={showAddMobileModal} onHide={() => setShowAddMobileModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Add New Mobile Product</Modal.Title>
  </Modal.Header>
  <Modal.Body>
      <Form onSubmit={handleSubmitmobile} style={{marginBottom:'50px'}}>
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
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',padding:'10px 0px'}}>
        <Button type="submit" style={{width:'fit-content'}}>Add Product</Button>
        </div>
        </Form>
      </Modal.Body>
</Modal>

<Modal show={showAddLaptopModal} onHide={() => setShowAddLaptopModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Add New Laptop Product</Modal.Title>
  </Modal.Header>
  <Modal.Body>
      <Form onSubmit={handleSubmitlaptop} style={{marginBottom:'50px'}}>
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
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',padding:'10px 0px'}}>
        <Button type="submit" style={{width:'fit-content'}}>Add Product</Button>
        </div>
      </Form>
      </Modal.Body>
</Modal>

      <Modal show={showAddSmartwatchModal} onHide={() => setShowAddSmartwatchModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Add New Smartwatch Product</Modal.Title>
  </Modal.Header>
  <Modal.Body>
      <Form onSubmit={handleSubmitsmartwatch} style={{marginBottom:'50px'}}>
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
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',padding:'20px 0px'}}>
        <Button type="submit" style={{width:'fit-content'}}>Add Product</Button>
        </div>
      </Form>
      </Modal.Body>
</Modal>
    
      <Modal show={showAddMenModal} onHide={() => setShowAddMenModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Add New Men Product</Modal.Title>
  </Modal.Header>
  <Modal.Body>
      <Form onSubmit={handleSubmitmen} style={{marginBottom:'50px'}}>
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
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',padding:'20px 0px'}}>
        <Button type="submit" style={{width:'fit-content'}}>Add Product</Button>
        </div>
      </Form>
      </Modal.Body>
</Modal>
   
      <Modal show={showAddWomenModal} onHide={() => setShowAddWomenModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Add New Women Product</Modal.Title>
  </Modal.Header>
  <Modal.Body>
      <Form onSubmit={handleSubmitwomen} style={{marginBottom:'50px'}}>
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
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',padding:'20px 0px'}}>
        <Button type="submit" style={{width:'fit-content'}}>Add Product</Button>
        </div>
      </Form>
      </Modal.Body>
</Modal>
      <Modal show={showAddKidModal} onHide={() => setShowAddKidModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Add New Kid Product</Modal.Title>
  </Modal.Header>
  <Modal.Body>
      <Form onSubmit={handleSubmitkid} style={{marginBottom:'50px'}}>
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
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',padding:'20px 0px'}}>
        <Button type="submit" style={{width:'fit-content'}}>Add Product</Button>
        </div>
      </Form>
      </Modal.Body>
</Modal>
    </div>
  );
};

export default ProductManagement;
