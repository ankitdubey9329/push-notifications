import React,{useState} from 'react'
import { Form, Button } from "react-bootstrap";
function Formuser() {

const [email, setEmail] = useState("");
const [name, setName] = useState("");

const Handler = async (e) => {
  e.preventDefault();

  const payload = {
    email,
    name,
  };
  const response = await fetch("/api/notify", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "content-type": "application/json",
    },
  });

  const data = await response.json();
  console.log(data);

  someFunction();
};

const someFunction = () => {
  if ("serviceWorker" in navigator) {
    send().catch((err) => console.error(err));
  }
};

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  // eslint-disable-next-line
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const send = async () => {
  console.log("register sw");
  const register = await navigator.serviceWorker.register("./worker.js", {
    scope: "/",
  });
  console.log("sw registered");

  console.log("push register");
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(
      "BFPh0ToK8cmYySGUxKZbIIJ99VgJF1gqPMjNqLwVriQ0CYnKQuQ_F9wCAEeAqVB0xrxzsGaVg5q4n7_UoVxg-Q8"
    ),
  });
  console.log("push regesterd");

  console.log("send push notification");
  await fetch("/api/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json",
    },
  });
  console.log("Push Sent...");
};
    return (
        <>

<div className="d-flex p-2 m-3 justify-content-center flex-column " >
            <div><h2> welcome,subscriber!</h2></div>
            <Form onSubmit={Handler} >
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email"  onChange={(e) => setEmail(e.target.value)} required/>
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicName">
    <Form.Label>Your name here</Form.Label>
    <Form.Control type="text" placeholder="Enter your name"  onChange={(e) => setName(e.target.value)} required/>
    
  </Form.Group>

  
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
</div>
        
        </>

    )
       
}

export default Formuser

