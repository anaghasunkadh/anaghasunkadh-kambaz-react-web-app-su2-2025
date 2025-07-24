
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
export default function CoursesNavigation() {
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
  const { cid } = useParams();
  console.log(cid);
  return (
    
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0 d-none d-md-block">
      {links.map((link)=>(
        <NavLink
        to={`/Kambaz/Courses/${cid}/${link}`}
        id={`wd-course-${link}-link`}
        className={({ isActive }) =>
          isActive
            ? "list-group-item border border-0 active text-black"
            : "list-group-item border text-danger border-0"
        }
        >
          {link}
        </NavLink>
      ))}
    </div>
  );
}
