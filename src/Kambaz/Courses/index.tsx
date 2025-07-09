import CourseNavigation from "./Navigation";
import Home from "./Home";
import { Navigate, Route, Routes } from "react-router";
import Modules from "./Modules";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Piazza from "./Piazza";
import Zoom from "./zoom";
import Quizzes from "./Quizzes";
import Grades from "./grades";





export default function Courses() {
  return (
    <div id="wd-courses">
      <h2>Course 1234</h2>
      <hr />
      <table>
        <tr>
          <td valign="top">
            <CourseNavigation />
          </td>
          <td valign="top">
            <Routes>
              <Route path="/" element={<Navigate to="Home" />} />
              <Route path="Modules" element={<Modules />} />
              <Route path="Assignments" element={<Assignments />} />
              <Route path="Assignments/:aid" element={<AssignmentEditor />} />
              <Route path="Home" element={<Home />} />
              <Route path="Assignments" element={<Assignments />} />
              <Route path="Piazza" element={<Piazza />} />
              <Route path="Zoom" element={<Zoom />} />
<Route path="Quizzes" element={<Quizzes />} />
<Route path="Grades" element={<Grades />} />

              <Route path="People" element={<h2>People</h2>} />
            </Routes>
          </td>
        </tr>
      </table>
    </div>
  );
}
