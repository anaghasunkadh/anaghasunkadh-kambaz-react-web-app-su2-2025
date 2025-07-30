import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"]
 return (
  <div id="wd-account-navigation" className="d-flex flex-column gap-2 p-3">
    {links.map((link) => (
      <NavLink
        key={link}
        to={`/Kambaz/Account/${link}`}
        className={({ isActive }) =>
          `fw-bold text-decoration-none ${isActive ? "text-black" : "text-danger"}`
        }
      >
        {link}
      </NavLink>
    ))}
  </div>
);
}
