import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

import { subscribeUser } from "../subscription";

function Formuser() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const Handler = async (e) => {
    e.preventDefault();

    const payload = {
      email,
      name,
    };
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/notify`,
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "content-type": "application/json",
        },
      }
    );

    const data = await response.json();
    console.log(data);
    subscribeUser();
  };

  return (
    <>
      <div className="d-flex p-2 m-3 justify-content-center flex-column ">
        <div>
          <h2> welcome,subscriber!</h2>
        </div>
        <Form onSubmit={Handler}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicName">
            <Form.Label>Your name here</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}

export default Formuser;
