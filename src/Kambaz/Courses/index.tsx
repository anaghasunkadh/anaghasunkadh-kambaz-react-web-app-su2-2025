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
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";





export default function Courses() {
  return (
    <div id="wd-courses">
      <h2  className="text-danger">
      <FaAlignJustify className="me-4 fs-4 mb-1" />
Course 1234</h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
      <CourseNavigation />
      </div>
    <div className="flex-fill"></div>
            <Routes>
              <Route path="/" element={<Navigate to="Home" />} />
              <Route path="Modules" element={<Modules />} />
              <Route path="Assignments" element={<Assignments />} />
              <Route path="Assignments/:aid" element={<AssignmentEditor />} />
              <Route path="Home" element={<Home />} />
              <Route path="Assignments" element={<Assignments />} />
               <Route path="People" element={<PeopleTable />} />
              <Route path="Piazza" element={<Piazza />} />
              <Route path="Zoom" element={<Zoom />} />
<Route path="Quizzes" element={<Quizzes />} />
<Route path="Grades" element={<Grades />} />

              <Route path="People" element={<h2>People</h2>} />
            </Routes>
         </div>
    </div>
  );
}
