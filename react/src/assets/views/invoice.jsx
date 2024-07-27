import React, { useState, useEffect } from 'react';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Row, Col, Container, Card, Table, Button, Form } from 'react-bootstrap';
import axiosClient from "../../axios-client.js";

// Validation schema
const validationSchema = Yup.object().shape({
  item: Yup.string().required('Item name is required'),
  price: Yup.number().min(1, 'Price must be greater than 0').required('Price is required'),
  quantity: Yup.number().min(1, 'Quantity must be greater than 0').required('Quantity is required'),
  paymentType: Yup.string().notOneOf(['Choose...'], 'Please select a payment type').required('Payment type is required'),
  invoiceNumber: Yup.string().required('Invoice number is required'),
  totalDiscountPercentage: Yup.number().min(0, 'Must be at least 0').max(100, 'Must be 100 or less'),
});

const Invoice = () => {
  const [items, setItems] = useState([]);
  const [item_names, setItemNames] = useState([]);
  const [invoiceNumber, setInvoiceNumber] = useState('');

  useEffect(() => {
    axiosClient.get("/item-all")
      .then(({ data }) => {
        console.log(data);
        setItemNames(data);
      })
      .catch((error) => {
        console.error('Error fetching items:', error);
      });
  }, []);

  useEffect(() => {
    axiosClient.get("/invoice-latest")
      .then(({ data }) => {
        setInvoiceNumber(data);
      })
      .catch((error) => {
        console.error('Error fetching invoice number:', error);
      });
  }, []);

  const addItem = (values, { resetForm }) => {
    console.log('addItem called with values:', values);
    const selectedItem = item_names.find(item => item.id === parseInt(values.item));
 

    const newItem = {
      item: values.item,
      itemName: selectedItem ? selectedItem.item_name : '',
      price: values.price,
      quantity: values.quantity,
      total: (values.price * values.quantity) - (values.price * values.quantity * values.totalDiscountPercentage / 100),
    };
    console.log('addItem called with values:', newItem);
    setItems([...items, newItem]);
    resetForm();
  };

  const deleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const fullTotal = items.reduce((acc, curr) => acc + curr.total, 0);

  const handleSubmit = () => {
    const invoiceData = {
      total_amount: fullTotal,
    };

    const invoiceItems = {
      items: items.map(item => ({
        id: item.item,
        price: item.price,
        quantity: item.quantity
      }))
    };

    

    axiosClient.post("/invoices", invoiceData)
    .then(({ data, status }) => {
      console.log('Invoice creation response:', data, 'Status:', status);
      // Post invoice items data
      if (status === 201) {
         alert('Invoice created successfully');
        setItems([]);
      }

      
    })
    
    .catch((error) => {
      console.error('There was an error creating the invoice!', error);
    });
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Item Details</Card.Title>
              <Formik
                initialValues={{
                  item: '',
                  price: 0,
                  quantity: 0,
                  paymentType: 'Choose...',
                  invoiceNumber: invoiceNumber,
                  totalDiscountPercentage: 0,
                }}
                validationSchema={validationSchema}
                onSubmit={addItem}
                enableReinitialize
              >
                {({ handleSubmit }) => (
                  <FormikForm onSubmit={handleSubmit}>
                    <Row className="mb-3">
                      <Col>
                        <Form.Group controlId="formItemName">
                          <Form.Label>Item Name</Form.Label>
                          <Field name="item" as="select" className="form-control">
                            <option value="">Choose...</option>
                            {item_names.map((item, index) => (
                              <option key={item.id} value={item.id}>{item.item_name}</option>
                            ))}
                          </Field>
                          <ErrorMessage name="item" component="div" className="text-danger" />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="formPrice">
                          <Form.Label>Price</Form.Label>
                          <Field name="price" type="number" className="form-control" />
                          <ErrorMessage name="price" component="div" className="text-danger" />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="formQuantity">
                          <Form.Label>Quantity</Form.Label>
                          <Field name="quantity" type="number" className="form-control" />
                          <ErrorMessage name="quantity" component="div" className="text-danger" />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col>
                        <Form.Group controlId="formPaymentType">
                          <Form.Label>Payment Type</Form.Label>
                          <Field as="select" name="paymentType" className="form-control">
                            <option>Choose...</option>
                            <option>Cash</option>
                            <option>Credit Card</option>
                            <option>Debit Card</option>
                            <option>Bank Transfer</option>
                          </Field>
                          <ErrorMessage name="paymentType" component="div" className="text-danger" />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="formInvoiceNumber">
                          <Form.Label>Invoice Number</Form.Label>
                          <Field name="invoiceNumber" className="form-control" value={invoiceNumber} readOnly />
                          <ErrorMessage name="invoiceNumber" component="div" className="text-danger" />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col>
                        <Form.Group controlId="formTotalDiscountPercentage">
                          <Form.Label>Total Discount (%)</Form.Label>
                          <Field name="totalDiscountPercentage" type="number" className="form-control" />
                          <ErrorMessage name="totalDiscountPercentage" component="div" className="text-danger" />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Button type="submit" className="btn btn-primary">Add Item</Button>
                      </Col>
                    </Row>
                  </FormikForm>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Added Items</Card.Title>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.itemName}</td>
                      <td>{item.price}</td>
                      <td>{item.quantity}</td>
                      <td>{item.total}</td>
                      <td>
                        <Button variant="danger" onClick={() => deleteItem(index)}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3" className="text-end"><strong>Full Total:</strong></td>
                    <td>{fullTotal.toFixed(2)}</td>
                    <td></td>
                  </tr>
                </tfoot>
              </Table>
              <Button variant="primary" onClick={handleSubmit}>Submit Invoice</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Invoice;
