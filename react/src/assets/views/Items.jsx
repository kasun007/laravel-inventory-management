import React, { useState, useEffect } from 'react';
import axiosClient from '../../axios-client'; // Ensure axiosClient is configured correctly
import { Container, Row, Col, Card, Table, Form, Button } from 'react-bootstrap';
import { Formik, Form as FormikForm, Field } from 'formik';

const ItemForm = () => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetchItems();
    fetchCategories();
    fetchSuppliers();
  }, []);

  const fetchNextPrevTasks = (link) => {
    const url = new URL(link);
    fetchItems(url.searchParams.get('page'));
  };

  const renderPaginationLinks = () => {
    if (items.data && items.meta) {
      return items.meta.links.map((link, index) => (
        <Button
          key={index}
          onClick={() => fetchNextPrevTasks(link.url)}
          dangerouslySetInnerHTML={{ __html: link.label }}
          className="m-1"
        />
      ));
    }
  };

  const fetchItems = (page = 1) => {
    setLoading(true);
    axiosClient
      .get('/items', { params: { page } })
      .then(({ data }) => {
        setItems(data || []);
      })
      .catch((err) => {
        console.error('Error fetching items', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchCategories = () => {
    axiosClient
      .get('/get-all-catogeries')
      .then(({ data }) => {
        setCategories(data || []);
      })
      .catch((err) => {
        console.error('Error fetching categories', err);
      });
  };

  const fetchSuppliers = () => {
    axiosClient
      .get('/supplier-show-all')
      .then(({ data }) => {
        setSuppliers(data || []);
      })
      .catch((err) => {
        console.error('Error fetching suppliers', err);
      });
  };






  const addItem = async (values) => {
 
    try {
      const newItem = {
        item_name: values.itemName,
        item_price: values.price,
        item_quantity: values.quantity,
        created_at: values.issueDate,
        item_description: values.item_description,
        item_category: values.category_id,
        supplier_item: values.supplier_id,
        selling_price: values.sellingPrice,
        item_image:   'default-image.png',
      };

      console.log('New item:', newItem);

      const response = await axiosClient.post('/items', newItem);

      // Assuming the response data contains the created item
      console.log('Item created:', response.data);

      // Update your state with the new item if necessary
      fetchItems();

    } catch (error) {
      if (error.response && error.response.status === 422) {
        // Extract the errors object and set it in the state
        const validationErrors = error.response.data.errors.item_name[0];
         
          alert(validationErrors);
    } else {
        console.error('An error occurred:', error);
    }
    }
  };

  const deleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Row>
        <Col>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Item Form</Card.Title>
              <Formik
                initialValues={{
                  itemName: '',
                  price: 0,
                  sellingPrice: 0,
                  quantity: 0,
                  issueDate: '',
                  category_id: '',
                  supplier_id: '',
                }}
                onSubmit={addItem}
                enableReinitialize
              >
                {({ handleSubmit }) => (
                  <FormikForm onSubmit={handleSubmit}>
                    <Row className="mb-3">
                      <Col>
                        <Form.Group controlId="itemName">
                          <Form.Label>Item Name</Form.Label>
                          <Field name="itemName" className="form-control" />
                        </Form.Group>
                      </Col>

                      <Col>
                        <Form.Group controlId="item_description">
                          <Form.Label>Item Description</Form.Label>
                          <Field name="item_description" className="form-control" />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="price">
                          <Form.Label>Price</Form.Label>
                          <Field name="price" type="number" className="form-control" />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="sellingPrice">
                          <Form.Label>Selling Price</Form.Label>
                          <Field name="sellingPrice" type="number" className="form-control" />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="quantity">
                          <Form.Label>Quantity</Form.Label>
                          <Field name="quantity" type="number" className="form-control" />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col>
                        <Form.Group controlId="issueDate">
                          <Form.Label>Issue Date</Form.Label>
                          <Field name="issueDate" type="date" className="form-control" />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="categoryName">
                          <Form.Label>Category Name</Form.Label>
                          <Field as="select" name="category_id" className="form-control">
                            <option value="">Choose...</option>
                            {categories.map((category) => (
                              <option key={category.id} value={category.id}>
                                {category.category_name}
                              </option>
                            ))}
                          </Field>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="supplier">
                          <Form.Label>Supplier</Form.Label>
                          <Field as="select" name="supplier_id" className="form-control">
                            <option value="">Choose...</option>
                            {suppliers.map((supplier) => (
                              <option key={supplier.id} value={supplier.id}>
                                {supplier.supplier_name}
                              </option>
                            ))}
                          </Field>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Button type="submit" className="btn btn-primary">
                          Add Item
                        </Button>
                        <Button type="reset" className="btn btn-secondary ms-2">
                          Reset
                        </Button>
                        <Button type="button" className="btn btn-danger ms-2">
                          Cancel
                        </Button>
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
                    <th>Issue Date</th>
                    <th>Category Name</th>
                    <th>Supplier</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.data && items.data.length > 0 ? (
                    items.data.map((item, index) => (
                      <tr key={index}>
                        <td>{item.item_name}</td>
                        <td>{item.item_price}</td>
                        <td>{item.item_quantity}</td>
                        <td>{item.created_at}</td>
                        <td>{item.category_name}</td>
                        <td>{item.supplier_name}</td>
                        <td>
                          <Button variant="danger" onClick={() => deleteItem(index)}>
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">
                        No items found
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center mt-3">
        <Col>{renderPaginationLinks()}</Col>
      </Row>
    </Container>
  );
};

export default ItemForm;
