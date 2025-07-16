import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function Profile() {
  return (
    <div id="wd-profile-screen" className="p-4">
      <h3>Profile</h3>

      <Form>
        <Form.Control
          defaultValue="alice"
          placeholder="username"
          className="mb-2"
        />

        <Form.Control
          defaultValue="123"
          placeholder="password"
          type="password"
          className="mb-2"
        />

        <Form.Control
          defaultValue="Anagha"
          placeholder="First Name"
          className="mb-2"
          id="wd-firstname"
        />

        <Form.Control
          defaultValue="Srinath"
          placeholder="Last Name"
          className="mb-2"
          id="wd-lastname"
        />

        <Form.Control
          defaultValue="2000-01-01"
          type="date"
          className="mb-2"
          id="wd-dob"
        />

        <Form.Control
          defaultValue="Srinath.a@northeastern.edu"
          type="email"
          className="mb-2"
          id="wd-email"
        />

        <Form.Select
          defaultValue="FACULTY"
          className="mb-3"
          id="wd-role"
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="FACULTY">Faculty</option>
          <option value="STUDENT">Student</option>
        </Form.Select>

        <Link to="/Kambaz/Account/Signin">
          <Button className="w-100" variant="danger">
            Sign out
          </Button>
        </Link>
      </Form>
    </div>
  );
}
