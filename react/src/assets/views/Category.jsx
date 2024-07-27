import { createRef, useState } from "react";
import axiosClient from "../../axios-client.js";
import CategoryList from "../component/CategoryList.jsx";
import Users from "./Users.jsx";
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

export default function Category() {
  const categoryRef = createRef();
  const slugRef = createRef();
  const descriptionRef = createRef();
  const [errors, setErrors] = useState(null);
  const [category_flag, setCategoryFlag] = useState(false);

  const onSubmit = (ev) => {
    
    ev.preventDefault();

    const payload = {
      category_name: categoryRef.current.value,
      category_slug: slugRef.current.value,
      category_description: descriptionRef.current.value,
    };

    console.log(payload);

    axiosClient
      .post("/categories", payload)
      .then(({ data }) => {
        setCategoryFlag(true);
        setErrors(null);
      })
      .catch((err) => {
        const response = err.response;

        if (response && response.status === 422) {
          if (response.data.errors) {
            setErrors(response.data.errors);
          } else {
            setErrors({ message: [response.data.message] });
          }
        }
      });
  };

  return (
    <Container fluid className="h-100 d-flex flex-column">
      <Row className="flex-grow-1">
        <Col className="d-flex flex-column justify-content-center align-items-center">
          <h1 className="text-success">Category</h1>

          {errors && (
            <Alert variant="danger">
              {Object.keys(errors).map((key) => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </Alert>
          )}

          <Form onSubmit={onSubmit} className="w-50">
            <Form.Group className="mb-3">
              <Form.Control type="text" ref={categoryRef} placeholder="Category name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="text" ref={slugRef} placeholder="Category slug" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="text" ref={descriptionRef} placeholder="Category description" />
            </Form.Group>
            <Button className="w-100" type="submit">Save</Button>
          </Form>
        </Col>
      </Row>

      <Row className="flex-grow-1 mt-3">
        <Col className=" justify-content-center align-items-center">
          <CategoryList
            categoryFlag={category_flag}
            setCategoryFlag={setCategoryFlag}
          />
        </Col>
      </Row>
    </Container>
  );
}
