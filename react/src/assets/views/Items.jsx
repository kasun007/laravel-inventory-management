
import React, { useState, useEffect } from 'react';
import axiosClient from '../../axios-client'; // Ensure axiosClient is configured correctly
import { Container, Row, Col, Card, Table, Form, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';



const validationSchema = Yup.object().shape({
  itemName: Yup.string().required('Item name is required'),
  price: Yup.number().min(1, 'Price must be greater than 0').required('Price is required'),
  quantity: Yup.number().min(1, 'Quantity must be greater than 0').required('Quantity is required'),
  issueDate: Yup.date().required('Issue date is required'),
  paymentType: Yup.string().notOneOf(['Choose...'], 'Please select a payment type').required('Payment type is required'),
  categoryName: Yup.string().required('Category name is required'),
  supplier: Yup.string().required('Supplier is required'),
});

const ItemForm = () => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]); // State for categories
  const [suppliers, setSuppliers] = useState([]); // State for suppliers

  useEffect(() => {
    fetchItems();
    fetchCategories(); // Fetch categories on component mount
    fetchSuppliers(); // Fetch suppliers on component mount
  }, []);



  const fetchNextPrevTasks = (link) => {
   
    const url = new URL(link);
    
    fetchItems(url.searchParams.get("page"));
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
    axiosClient.get("/items",{ params: { page } })
      .then(({ data }) => {
        if (data ) {
          setItems(data); // Accessing the items array correctly
        } else {
          setItems([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching items", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchCategories = () => {
    axiosClient.get("/get-all-catogeries") // Assuming the endpoint to fetch categories is '/categories'
      .then(({ data }) => {
        if (data) {
          setCategories(data); // Set the fetched categories
        }
      })
      .catch((err) => {
        console.error("Error fetching categories", err);
      });
  };

  const fetchSuppliers = () => {
    axiosClient.get("/supplier-show-all") // Assuming the endpoint to fetch suppliers is '/suppliers'
      .then(({ data }) => {
        if (data) {
          setSuppliers(data); // Set the fetched suppliers
        }
      })
      .catch((err) => {
        console.error("Error fetching suppliers", err);
      });
  };


  const addItem = (values, { resetForm }) => {
    const newItem = {
      itemName: values.itemName,
      price: values.price,
      quantity: values.quantity,
      issueDate: values.issueDate,
      paymentType: values.paymentType,
      categoryName: values.categoryName,
      supplier: values.supplier,
    };
    setItems([...items, newItem]);
    resetForm();
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
                  quantity: 0,
                  issueDate: '',
                  paymentType: 'Choose...',
                  categoryName: '',
                  supplier: '',
                }}
                validationSchema={validationSchema}
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
                          <ErrorMessage name="itemName" component="div" className="text-danger" />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="price">
                          <Form.Label>Price</Form.Label>
                          <Field name="price" type="number" className="form-control" />
                          <ErrorMessage name="price" component="div" className="text-danger" />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="quantity">
                          <Form.Label>Quantity</Form.Label>
                          <Field name="quantity" type="number" className="form-control" />
                          <ErrorMessage name="quantity" component="div" className="text-danger" />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col>
                        <Form.Group controlId="issueDate">
                          <Form.Label>Issue Date</Form.Label>
                          <Field name="issueDate" type="date" className="form-control" />
                          <ErrorMessage name="issueDate" component="div" className="text-danger" />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="categoryName">
                          <Form.Label>Category Name</Form.Label>
                          <Field as="select" name="categoryName" className="form-control">
                            <option value="">Choose...</option>
                            {categories.map((category) => (
                              <option key={category.id} value={category.id}>
                                {category.category_name}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage name="categoryName" component="div" className="text-danger" />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="supplier">
                          <Form.Label>Supplier</Form.Label>
                          <Field as="select" name="supplier" className="form-control">
                            <option value="">Choose...</option>
                            {suppliers.map((supplier) => (
                              <option key={supplier.id} value={supplier.id}>
                                {supplier.supplier_name}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage name="supplier" component="div" className="text-danger" />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Button type="submit" className="btn btn-primary">Add Item</Button>
                        <Button type="reset" className="btn btn-secondary ms-2">Reset</Button>
                        <Button type="button" className="btn btn-danger ms-2">Cancel</Button>
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
                  { items.data && items.data.length > 0 ? (
                    items.data.map((item, index) => (
                      <tr key={index}>
                        <td>{item.item_name}</td>
                        <td>{item.item_price}</td>
                        <td>{item.item_quantity}</td>
                        <td>{item.created_at}</td>
                        <td>{item.category_name}</td>
                        <td>{item.supplier_name}</td>
                        <td>
                          <Button variant="danger" onClick={() => deleteItem(index)}>Delete</Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center">No items found</td>
                    </tr>
                  )}
                </tbody>
              </Table>

            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center mt-3">
        <Col>
          {renderPaginationLinks()}
        </Col>
      </Row>
    </Container>
  );
};

export default ItemForm;
