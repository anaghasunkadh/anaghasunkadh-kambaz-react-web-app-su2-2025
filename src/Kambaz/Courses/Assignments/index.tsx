import { Link, Route, Routes, useParams, useNavigate } from "react-router-dom";
import { FaSearch, FaPlus, FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import { BsGripVertical } from "react-icons/bs";
import { MdAssignment } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import GreenCheckmark from "../Modules/GreenCheckmark";
import AssignmentEditor from "./Editor";
import { deleteAssignment } from "./reducer";

// Define the assignment type
interface Assignment {
  _id: string;
  title: string;
  course: string;
  description?: string;
  points?: number;
  dueDate?: string;
  availableFromDate?: string;
  availableUntilDate?: string;
}

export default function Assignments() {
  const { cid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get assignments from Redux store instead of database
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const filteredAssignments: Assignment[] = assignments?.filter((assignment: Assignment) => assignment.course === cid) || [];

  // DEBUG: Log the assignments to see what we're working with
  console.log(' ASSIGNMENTS DEBUG:');
  console.log('All assignments from store:', assignments);
  console.log('Filtered assignments for course', cid, ':', filteredAssignments);
  console.log('First assignment details:', filteredAssignments[0]);
  
  // State for delete confirmation dialog
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<Assignment | null>(null);

  // Handler for creating new assignment
  const handleAddAssignment = () => {
    navigate(`/Kambaz/Courses/${cid}/Assignments/new`);
  };

  // Handler for editing assignment
  const handleEditAssignment = (assignmentId: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    console.log(' Edit button clicked');
    console.log(' Assignment ID to edit:', assignmentId);
    console.log('Assignment ID type:', typeof assignmentId);
    console.log('Course ID:', cid);
    
    if (!assignmentId) {
      console.error(' Assignment ID is undefined!');
      return;
    }
    
    const navigationPath = `/Kambaz/Courses/${cid}/Assignments/${assignmentId}`;
    console.log('🔧 Navigating to:', navigationPath);
    
    navigate(navigationPath);
  };

  // Handler for delete confirmation
  const handleDeleteClick = (assignment: Assignment, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    console.log(' Delete button clicked for:', assignment._id, assignment.title);
    setAssignmentToDelete(assignment);
    setShowDeleteDialog(true);
  };

  // Handler for confirming delete
  const confirmDelete = () => {
    if (assignmentToDelete) {
      console.log(' Confirming delete for:', assignmentToDelete._id);
      dispatch(deleteAssignment(assignmentToDelete._id));
    }
    setShowDeleteDialog(false);
    setAssignmentToDelete(null);
  };

  // Handler for canceling delete
  const cancelDelete = () => {
    setShowDeleteDialog(false);
    setAssignmentToDelete(null);
  };

  return (
    <div id="wd-assignments" className="p-3">
      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
              </div>
              <div className="modal-body">
                Are you sure you want to remove the assignment "{assignmentToDelete?.title}"?
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={cancelDelete}>
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={confirmDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search bar + Buttons */}
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
          <button 
            id="wd-add-assignment" 
            className="btn btn-danger"
            onClick={handleAddAssignment}
          >
            <FaPlus className="me-1" /> Assignment
          </button>
        </div>
      </div>

      {/* Section Title */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="fw-bold fs-5">ASSIGNMENTS</div>
        <div className="d-flex align-items-center">
          <span className="rounded-pill border border-secondary px-3 py-1 me-2">
            40% of Total
          </span>
          <IoEllipsisVertical />
        </div>
      </div>

      {/* DEBUG INFO */}
      <div style={{ background: '#f0f0f0', padding: '10px', marginBottom: '20px', fontSize: '12px' }}>
        <strong>DEBUG INFO:</strong><br/>
        Course ID: {cid}<br/>
        Total assignments in store: {assignments?.length || 0}<br/>
        Filtered assignments for this course: {filteredAssignments.length}<br/>
        First assignment ID: {filteredAssignments[0]?._id}<br/>
        First assignment title: {filteredAssignments[0]?.title}
      </div>

      {/* Assignment List */}
      <div className="border border-secondary rounded">
        {filteredAssignments.map((assignment: Assignment, index: number) => (
          <div 
            key={assignment._id}
            className={`border-start border-success border-5 p-3 ${
              index < filteredAssignments.length - 1 ? 'border-bottom' : ''
            }`}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 text-muted" />
                <MdAssignment className="me-2 text-muted" />
                <Link to={assignment._id} className="fw-bold text-dark text-decoration-none">
                  {assignment.title}
                </Link>
                {/* DEBUG: Show ID next to title */}
                <small className="text-muted ms-2">(ID: {assignment._id})</small>
              </div>
              <div className="d-flex align-items-center">
                <FaPencil 
                  className="text-primary me-3" 
                  style={{ cursor: 'pointer' }}
                  onClick={(e) => {
                    console.log(' Pencil clicked for assignment:', assignment);
                    console.log(' Assignment ID:', assignment._id);
                    handleEditAssignment(assignment._id, e);
                  }}
                  title="Edit Assignment"
                />
                <FaTrash 
                  className="text-danger me-3" 
                  style={{ cursor: 'pointer' }}
                  onClick={(e) => handleDeleteClick(assignment, e)}
                  title="Delete Assignment"
                />
                <GreenCheckmark />
                <IoEllipsisVertical className="ms-2" />
              </div>
            </div>
            <div className="ms-5">
              <div className="small">
                <span className="text-danger">Multiple Modules</span> | 
                <span className="text-dark"> Not available until {assignment.availableFromDate || 'May 6 at 12:00am'}</span> |
              </div>
              <div className="text-muted small">
                Due {assignment.dueDate || 'May 13 at 11:59pm'} | {assignment.points || 100} pts
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show message if no assignments */}
      {filteredAssignments.length === 0 && (
        <div className="text-center py-4">
          <p>No assignments found for this course.</p>
        </div>
      )}

      {/* Nested routes */}
      <Routes>
        <Route path="new" element={<AssignmentEditor />} />
        <Route path=":assignmentId" element={<AssignmentEditor />} />
      </Routes>
    </div>
  );
}