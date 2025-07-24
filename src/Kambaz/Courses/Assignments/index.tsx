import { Link, Route, Routes, useParams } from "react-router-dom";
import { FaSearch, FaPlus } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { BsGripVertical } from "react-icons/bs";
import { MdAssignment } from "react-icons/md";
import GreenCheckmark from "../Modules/GreenCheckmark";
import AssignmentEditor from "./Editor";
import * as db from "../../Database";

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments.filter((assignment: any) => assignment.course === cid);

  return (
    <div id="wd-assignments" className="p-3">

      {/* Search bar + Buttons - keep as is */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="position-relative" style={{ width: "300px" }}>
          <FaSearch className="position-absolute ms-3 mt-2 text-muted" style={{ zIndex: 1 }} />
          <input
            id="wd-search-assignment"
            placeholder="Search for Assignments"
            className="form-control ps-5"
            style={{ paddingLeft: "2.5rem" }}
          />
        </div>
        <div>
          <button id="wd-add-assignment-group" className="btn btn-light me-2">
            <FaPlus className="me-1" /> Group
          </button>
          <button id="wd-add-assignment" className="btn btn-danger">
            <FaPlus className="me-1" /> Assignment
          </button>
        </div>
      </div>

      {/* Section Title - keep as is */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="fw-bold fs-5">ASSIGNMENTS</div>
        <div className="d-flex align-items-center">
          <span className="rounded-pill border border-secondary px-3 py-1 me-2">
            40% of Total
          </span>
          <IoEllipsisVertical />
        </div>
      </div>

      {/* Assignment List - REPLACE this section with dynamic rendering */}
      <div className="border border-secondary rounded">
        {assignments.map((assignment: any, index: number) => (
          <div 
            key={assignment._id}
            className={`border-start border-success border-5 p-3 ${
              index < assignments.length - 1 ? 'border-bottom' : ''
            }`}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 text-muted" />
                <MdAssignment className="me-2 text-muted" />
                <Link to={assignment._id} className="fw-bold text-dark text-decoration-none">
                  {assignment.title}
                </Link>
              </div>
              <div className="d-flex align-items-center">
                <GreenCheckmark />
                <IoEllipsisVertical className="ms-2" />
              </div>
            </div>
            <div className="ms-5">
              <div className="small">
                <span className="text-danger">Multiple Modules</span> | 
                <span className="text-dark"> Not available until May 6 at 12:00am</span> |
              </div>
              <div className="text-muted small">Due May 13 at 11:59pm | 100 pts</div>
            </div>
          </div>
        ))}
      </div>

      {/* Nested route for editor - keep as is */}
      <Routes>
       <Route path=":assignmentId" element={<AssignmentEditor />} />
      </Routes>
    </div>
  );
}