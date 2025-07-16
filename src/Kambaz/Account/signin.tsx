import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function Signin() {
  return (
    <div id="wd-signin-screen" className="p-4">
      <h3>Sign in</h3>

      <Form>
        <Form.Control
          id="wd-username"
          placeholder="username"
          className="mb-2"
          defaultValue="anagha"
        />

        <Form.Control
          id="wd-password"
          type="password"
          placeholder="password"
          className="mb-2"
          defaultValue="password123"
        />

        <Link to="/Kambaz/Dashboard">
          <Button
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
