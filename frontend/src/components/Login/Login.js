import React, { useState } from 'react';
import { Container, TextInput, Button } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login({ setUser }) {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = values.email.endsWith('@admin.com') ? 'http://localhost:5001/admin/login' : 'http://localhost:5001/login';
    axios.post(url, values)
      .then(res => {
        const { status, name, token } = res.data;
        if (status === "Success") {
          const userData = { name, email: values.email, token };
          setUser(userData);
          if (values.email.endsWith('@admin.com')) {
            navigate('/admindashboard'); 
          } else {
            navigate('/'); 
          }
        } else {
          alert("Invalid email or password");
        }
      })
      .catch(err => {
        console.error("Error logging in:", err);
        alert("An error occurred, please try again later");
      });
  };

  return (
    <Container style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f9fa' }}>
      <Container style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '5px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)', maxWidth: '400px', width: '100%' }}>
        <h2>LOGIN</h2>
        <form onSubmit={handleSubmit}>
          {/* Your input fields */}
          <TextInput
            placeholder='Enter Email'
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            label='Email'
            required
            variant='outline'
            radius='md'
            className='mb-3'
            styles={{
              label: { fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '16px' }
            }}
          />
          <TextInput
            type='password'
            placeholder='Enter Password'
            value={values.password}
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            label='Password'
            required
            variant='outline'
            radius='md'
            className='mb-3'
            styles={{
              label: { fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '16px' }
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button type='submit' color='teal' variant='filled' style={{ width: '100%' }}>Login</Button>
          </div>
          <Link to='/register' className='text-center block mt-2'><button>Register</button></Link>
        </form>
      </Container>
    </Container>
  );
}

export default Login;
