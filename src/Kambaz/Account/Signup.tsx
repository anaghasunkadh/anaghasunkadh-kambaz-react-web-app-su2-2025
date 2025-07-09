import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div id="wd-signup-screen">
      <h3>Sign up</h3>
      
      <input
        placeholder="username"
        className="wd-username"
        defaultValue="newuser"
      /><br />

      <input
        placeholder="password"
        type="password"
        className="wd-password"
        defaultValue="password123"
      /><br />

      <input
        placeholder="verify password"
        type="password"
        className="wd-password-verify"
        defaultValue="password123"
      /><br />

      <Link id="wd-signup-btn" to="/Kambaz/Account/Profile">Sign up</Link><br />
      <Link id="wd-signin-link" to="/Kambaz/Account/Signin">Sign in</Link>
    </div>
  );
}
