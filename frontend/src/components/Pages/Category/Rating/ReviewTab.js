import React, { useState } from 'react'
import { Card, Col, Nav, Tab, Form, Row, Button } from 'react-bootstrap'
import StarRating from './StarRating';
import {product} from '../../Category/'

function ReviewTab() {

    const [rating, setRating] = useState(0);
    const color = 'gold';
  
    const handleRatingChange = (newRating) => {
      setRating(newRating);
    };

    
  return (
    <div>
      <Card style={{marginTop:'30px'}}>
              <Col style={{marginTop:'30px', marginBottom:'30px'}}>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Row>
                <Col sm={3}>
                  <Nav variant="pills" className="flex-column" style={{marginLeft:'10px'}}>
                    <Nav.Item>
                      <Nav.Link eventKey="first" className='bg-dark' >Reviews</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Tab 2</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={9}>
                  <Tab.Content>
                    <Tab.Pane eventKey="first">
                      <Card style={{marginRight:'10px'}}>
                        <Card.Body>
                          <Card.Text>
                            Be the first to review {product.name}
                          </Card.Text>
                          <Card.Text>
                          Your email address will not be published. Required fields are marked *
                          </Card.Text>
                          <Form>
                            <Form.Label>your rating*
                            <StarRating rating={rating} color={color}  onChange={handleRatingChange}  required/>
                            </Form.Label>
                            <Form.Label>your review*</Form.Label>
                            <textarea required />
                            <Form.Label>Name*</Form.Label>
                            <Col><input type='text' required/></Col>
                            <Form.Label>Email*</Form.Label>
                            <Col><input type='email' required/></Col>
                            <Button type='submit' style={{marginTop:'20px', marginLeft:'150px', width:'fit-content'}}>Submit</Button>
                          </Form>
                        </Card.Body>
                      </Card>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">Second tab content</Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Col>
            </Card>
    </div>
  )
}

export default ReviewTab
