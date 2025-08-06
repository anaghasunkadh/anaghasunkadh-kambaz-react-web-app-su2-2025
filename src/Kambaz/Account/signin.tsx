import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import * as db from "../Database";
import * as client from "./client";

export default function Signin() {
   const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signin = async() => {
    const user =  await client.signin(credentials);
    if (!user) return;
    dispatch(setCurrentUser(user));
    navigate("/Kambaz/Dashboard");
  };

  return (
    <div id="wd-signin-screen" className="p-4">
      <h3>Sign in</h3>

      <Form>
        <Form.Control defaultValue={credentials.username}
             onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          id="wd-username"
          placeholder="username"
          className="mb-2"
          
        />

        <Form.Control  defaultValue={credentials.password}
             onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          id="wd-password"
          type="password"
          placeholder="password"
          className="mb-2"
          
        />

        <Link to="/Kambaz/Dashboard">
           <Button onClick={signin}
            id="wd-signin-btn"
            className="w-100 mb-2"
            variant="primary"
          >
            Sign in
          </Button>
        </Link>

        <Link id="wd-signup-link" to="/Kambaz/Account/Signup">
          Sign up
        </Link>
      </Form>
    </div>
  );
}
