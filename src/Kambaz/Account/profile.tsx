import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  
  const fetchProfile = () => {
    if (!currentUser) return navigate("/Kambaz/Account/Signin");
    setProfile(currentUser);
  };
  
  const signout = () => {
    dispatch(setCurrentUser(null));
    navigate("/Kambaz/Account/Signin");
  };
  
  useEffect(() => { fetchProfile(); }, []);

  return (
    <div id="wd-profile-screen" className="p-4">
      <h3>Profile</h3>
      {profile && (
        <Form>
          <Form.Control
            defaultValue={profile.username}
            placeholder="username"
            className="mb-2"
            onChange={(e) => setProfile({ ...profile, username: e.target.value })}
          />

          <Form.Control
            defaultValue={profile.password}
            placeholder="password"
            type="password"
            className="mb-2"
            onChange={(e) => setProfile({ ...profile, password: e.target.value })}
          />

          <Form.Control
            defaultValue={profile.firstName}
            placeholder="First Name"
            className="mb-2"
            id="wd-firstname"
            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
          />

          <Form.Control
            defaultValue={profile.lastName}
            placeholder="Last Name"
            className="mb-2"
            id="wd-lastname"
            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
          />

          <Form.Control
            defaultValue={profile.dob}
            type="date"
            className="mb-2"
            id="wd-dob"
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
          />

          <Form.Control
            defaultValue={profile.email}
            type="email"
            className="mb-2"
            id="wd-email"
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />

          <Form.Select
            defaultValue={profile.role}
            className="mb-3"
            id="wd-role"
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </Form.Select>

          <Button onClick={signout} className="w-100" variant="danger">
            Sign out
          </Button>
        </Form>
      )}
    </div>
  );
}