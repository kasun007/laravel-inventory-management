import axiosClient from "../../axios-client.js";
import { useStateContext } from "../../context/ContextProvider.jsx";
import { createRef, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Form, Button, Alert, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Signup() {
  const nameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmationRef = createRef();
  const { setUser, setToken } = useStateContext();
  const [errors, setErrors] = useState(null);

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };

    axiosClient
      .post("/signup", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;

        console.log(response);
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Card className="p-4" style={{ maxWidth: "500px", width: "100%" }}>
        <Card.Body>
          <h1 className="text-center mb-4">Signup for Free</h1>
          {errors && (
            <Alert variant="danger">
              {Object.keys(errors).map((key) => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </Alert>
          )}
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                ref={nameRef}
                type="text"
                placeholder="Full Name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                ref={emailRef}
                type="email"
                placeholder="Email Address"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                ref={passwordRef}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                ref={passwordConfirmationRef}
                type="password"
                placeholder="Repeat Password"
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100">
              Signup
            </Button>
          </Form>
          <p className="text-center mt-3">
            Already registered? <Link to="/login">Sign In</Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
}
