import React, { useState } from 'react';
import { Form, Row, Col, Container, Card, Table, Button } from 'react-bootstrap';

const Invoice = () => {
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [issueDate, setIssueDate] = useState('');
  const [paymentType, setPaymentType] = useState('Choose...');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [totalDiscountPercentage, setTotalDiscountPercentage] = useState(0);
  const [items, setItems] = useState([]);

  // Calculate totals based on item details and total discount percentage
  const subtotal = price * quantity;
  const totalDiscount = (subtotal * totalDiscountPercentage) / 100;
  const total = subtotal - totalDiscount;

  // Handle adding an item
  const addItem = (event) => {
    event.preventDefault();

    const newItem = {
      itemName,
      price,
      quantity,
      total
    };
    setItems([...items, newItem]);
    // Reset form fields after adding item
    setItemName('');
    setPrice(0);
    setQuantity(0);
    setIssueDate('');
    setPaymentType('Choose...');
    setInvoiceNumber('');
    setTotalDiscountPercentage(0);
  };

  // Handle deleting an item
  const deleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  // Calculate full total
  const fullTotal = items.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <Container fluid>
      <Row>
        <Col>
          {/* Card for Item details */}
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Item Details</Card.Title>
              <Form onSubmit={addItem}>
                <Row className="mb-3">
                  <Col>
                    <Form.Group controlId="formItemName">
                      <Form.Label>Item Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter item name" value={itemName} onChange={(e) => setItemName(e.target.value)} />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formPrice">
                      <Form.Label>Price</Form.Label>
                      <Form.Control type="number" placeholder="Enter price" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formQuantity">
                      <Form.Label>Quantity</Form.Label>
                      <Form.Control type="number" placeholder="Enter quantity" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <Form.Group controlId="formIssueDate">
                      <Form.Label>Issue Date</Form.Label>
                      <Form.Control type="date" placeholder="Select issue date" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formPaymentType">
                      <Form.Label>Payment Type</Form.Label>
                      <Form.Control as="select" value={paymentType} onChange={(e) => setPaymentType(e.target.value)}>
                        <option>Choose...</option>
                        <option>Cash</option>
                        <option>Credit Card</option>
                        <option>Debit Card</option>
                        <option>Bank Transfer</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formInvoiceNumber">
                      <Form.Label>Invoice Number</Form.Label>
                      <Form.Control type="text" placeholder="Enter invoice number" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <Form.Group controlId="formTotalDiscountPercentage">
                      <Form.Label>Total Discount (%)</Form.Label>
                      <Form.Control type="number" placeholder="Enter total discount percentage" value={totalDiscountPercentage} onChange={(e) => setTotalDiscountPercentage(parseFloat(e.target.value))} />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <button type="submit" className="btn btn-primary">Add Item</button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Table for displaying added items */}
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
                    <td></td>
                    <td>{fullTotal}</td>
                  </tr>
                </tfoot>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Invoice;
