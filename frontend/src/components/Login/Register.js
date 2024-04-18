import React, { useState } from 'react';
import { Container, TextInput, Button } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    contactNumber:''
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5001/register', values)
      .then(res => {
        if (res.data.status === "Success") {
          navigate('/login');
        } else {
          alert("ERROR");
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <Container style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f9fa' }}>
      <Container style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '5px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)', maxWidth: '400px', width: '100%' }}>
        <h2>REGISTRATION</h2>
        <form onSubmit={handleSubmit}>
          <TextInput
            placeholder='Enter Name'
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
            label='Name'
            required
            variant='outline'
            radius='md'
            className='mb-3'
          />
          <TextInput
            placeholder='Enter Email'
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            label='Email'
            required
            variant='outline'
            radius='md'
            className='mb-3'
          />
          <TextInput
            placeholder='Enter Password'
            type='password'
            value={values.password}
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            label='Password'
            required
            variant='outline'
            radius='md'
            className='mb-3'
          />
          <TextInput
            placeholder='Enter contactNumber'
            type='number'
            value={values.contactNumber}
            onChange={(e) => setValues({ ...values, contactNumber: e.target.value })}
            label='contactNumber'
            required
            variant='outline'
            radius='md'
            className='mb-3'
          />
          <Button type='submit' color='teal' variant='filled' style={{ width: '100%', marginBottom: '10px' }}>Register</Button>
          <h6>Already Registered?</h6><Link to='/login' style={{ display: 'block', textAlign: 'center', fontSize: '14px' }}><button>Login</button></Link>
        </form>
      </Container>
    </Container>
  );
}

export default Register;
