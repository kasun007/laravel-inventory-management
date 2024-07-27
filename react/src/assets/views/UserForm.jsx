import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useStateContext } from "../../context/ContextProvider.jsx";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../axios-client.js";
import { Form, Button, Spinner, Container, Row, Col } from "react-bootstrap";
 

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
});

export default function UserForm() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();

  const { handleSubmit, control, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (id) {
      setLoading(true);
      axiosClient
        .get(`/users/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setUser(data);
          setValue("name", data.name);
          setValue("email", data.email);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [id, setValue]);

  const onSubmit = (data) => {
    if (user.id) {
      axiosClient
        .put(`/users/${user.id}`, data)
        .then(() => {
          setNotification("User was successfully updated");
          navigate("/users");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient
        .post("/users", data)
        .then(() => {
          setNotification("User was successfully created");
          navigate("/users");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          {user.id ? <h1>Update User: {user.name}</h1> : <h1>New User</h1>}
          <div> {/* Add custom CSS class */}
            {loading && (
              <div className="text-center">
                <Spinner animation="border" />
              </div>
            )}
            {!loading && (
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="formName" className="mb-3">
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <Form.Control
                        type="text"
                        placeholder="Name"
                        isInvalid={!!errors.name}
                        className="custom-input" // Add custom CSS class
                        {...field}
                      />
                    )}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name?.message}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formEmail" className="mb-3">
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        isInvalid={!!errors.email}
                        className="custom-input" // Add custom CSS class
                        {...field}
                      />
                    )}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email?.message}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formPassword" className="mb-3">
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        isInvalid={!!errors.password}
                        className="custom-input" // Add custom CSS class
                        {...field}
                      />
                    )}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password?.message}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formPasswordConfirmation" className="mb-3">
                  <Controller
                    name="password_confirmation"
                    control={control}
                    render={({ field }) => (
                      <Form.Control
                        type="password"
                        placeholder="Password Confirmation"
                        isInvalid={!!errors.password_confirmation}
                        className="custom-input" // Add custom CSS class
                        {...field}
                      />
                    )}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password_confirmation?.message}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                  Save
                </Button>
              </Form>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
