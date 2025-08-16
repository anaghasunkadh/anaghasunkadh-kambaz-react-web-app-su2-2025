// REMOVE these imports - we're no longer using local JSON files:
// import users from "../../Database/users.json";
// import enrollments from "../../Database/enrollments.json";
import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import PeopleDetails from "./Details"
import { Link } from "react-router-dom";

// CHANGE: Accept users as a prop with default empty array
export default function PeopleTable({ users = [] }: { users?: any[] }) {
  // REMOVE: const { cid } = useParams(); - not needed anymore
  
  // REMOVE: All the filtering logic since users come pre-filtered from parent

  return (
    <div id="wd-people-table">
      <PeopleDetails />
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {/* CHANGE: Use the users prop directly instead of enrolledUsers */}
          {users.map((user: any) => (
            <tr key={user._id}>
              <td className="wd-full-name text-nowrap">
                 <Link to={`/Kambaz/Account/Users/${user._id}`} className="text-decoration-none">
                <FaUserCircle className="me-2 fs-1 text-secondary" />
                <span className="wd-first-name">{user.firstName}</span>{" "}
                <span className="wd-last-name">{user.lastName}</span>
                </Link>
              </td>
              <td className="wd-login-id">{user.loginId}</td>
              <td className="wd-section">{user.section}</td>
              <td className="wd-role">{user.role}</td>
              <td className="wd-last-activity">{user.lastActivity}</td>
              <td className="wd-total-activity">{user.totalActivity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}