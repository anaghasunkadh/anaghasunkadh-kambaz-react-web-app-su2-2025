import { NavLink } from "react-router-dom";

export default function AccountNavigation() {
  return (
    <div id="wd-account-navigation" className="d-flex flex-column gap-2 p-3">
      <NavLink
        to="/Kambaz/Account/Signin"
        className={({ isActive }) =>
          `fw-bold text-decoration-none ${isActive ? "text-black" : "text-danger"}`
        }
      >
        Signin
      </NavLink>

      <NavLink
        to="/Kambaz/Account/Signup"
        className={({ isActive }) =>
          `fw-bold text-decoration-none ${isActive ? "text-black" : "text-danger"}`
        }
      >
        Signup
      </NavLink>

      <NavLink
        to="/Kambaz/Account/Profile"
        className={({ isActive }) =>
          `fw-bold text-decoration-none ${isActive ? "text-black" : "text-danger"}`
        }
      >
        Profile
      </NavLink>
    </div>
  );
}
