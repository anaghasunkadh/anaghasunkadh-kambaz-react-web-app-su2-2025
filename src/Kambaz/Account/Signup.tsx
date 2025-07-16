import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function Signup() {
  return (
    <div id="wd-signup-screen" className="p-4">
      <h3>Sign up</h3>

      <Form>
        <Form.Control
          placeholder="username"
          className="mb-2"
          defaultValue="newuser"
        />

        <Form.Control
          type="password"
          placeholder="password"
          className="mb-2"
          defaultValue="password123"
        />

        <Form.Control
          type="password"
          placeholder="verify password"
          className="mb-2"
          defaultValue="password123"
        />

        <Link to="/Kambaz/Account/Profile">
          <Button id="wd-signup-btn" className="w-100 mb-2" variant="primary">
            Sign up
          </Button>
        </Link>

        <Link id="wd-signin-link" to="/Kambaz/Account/Signin">
          Sign in
        </Link>
      </Form>
    </div>
  );
}
