import { Link } from "react-router-dom";
import { createRef, useState } from "react";
import axiosClient from "../../axios-client.js";
import { useStateContext } from "../../context/ContextProvider.jsx";

export default function Login() {
  const emailRef = createRef();
  const passwordRef = createRef();
  const { setUser, setToken } = useStateContext();
  const [errors, setErrors] = useState(null);

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    console.log(payload);
    axiosClient
      .post("/login", payload)

      .then(({ data }) => {
        console.log(data);
        setUser(data.user);
        setToken(data.token);
      })

      .catch((err) => {
        const response = err.response;

        if (response && response.status === 422) {
          if (response.data.errors) {
            setErrors(response.data.errors);
          } else {
            console.log(response);
            setErrors({ email: [response.data.message] });
          }
        }
      });
  };

  return (
    <div className="container" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "lightpurple" }}>
      <div className="row justify-content-center">
        <div className="col-md-29"> {/* Increase the width to col-md-8 */}
          <div className="card">
            <div className="card-body">
              <h1 className="card-title">Login into your account</h1>
              {errors && (
                <div className="alert alert-danger">
                  {Object.keys(errors).map((key) => (
                    <p key={key}>{errors[key][0]}</p>
                  ))}
                </div>
              )}
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label>Email</label>
                  <input ref={emailRef} type="email" className="form-control" placeholder="Enter email" />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input ref={passwordRef} type="password" className="form-control" placeholder="Enter password" />
                </div>
                <button type="submit" className="btn btn-primary" style={{ marginTop: "10px" }}>Login</button> {/* Add marginTop style */}
              </form>
              <p className="message">
                Not Registered <Link to="/signup">Create an account</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
