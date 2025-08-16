import { Link } from "react-router-dom";
import { Button, Card, Col, Row, FormControl } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import * as enrollmentsClient from "./Enrollments/client";
import { setEnrollments, addEnrollment, removeEnrollment } from "./Enrollments/reducer";

export default function Dashboard({
  courses, course, setCourse, addNewCourse, deleteCourse, updateCourse, enrolling, setEnrolling, updateEnrollment
}: {
  courses: any[]; 
  course: any; 
  setCourse: (course: any) => void;
  addNewCourse: () => void; 
  deleteCourse: (courseId: string) => void;
  updateCourse: () => void;
  enrolling: boolean;
  setEnrolling: (enrolling: boolean) => void;
  updateEnrollment: (courseId: string, enrolled: boolean) => Promise<void>;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
 
const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
const [showAllCourses] = useState(false);
const [loading, setLoading] = useState(false);
const dispatch = useDispatch();
useEffect(() => {
  fetchEnrollments();
}, [currentUser]);

// Add these functions
const fetchEnrollments = async () => {
  if (!currentUser) return;
  try {
    const myEnrollments = await enrollmentsClient.findMyEnrollments();
    dispatch(setEnrollments(myEnrollments));
  } catch (error) {
    console.error("Failed to fetch enrollments:", error);
  }
};

const isEnrolled = (courseId: string) => {
  return enrollments.some(
    (enrollment: any) => 
      enrollment.user === currentUser?._id && 
      enrollment.course === courseId
  );
};



// Add this to filter courses
const displayedCourses = enrolling 
  ? courses 
  : courses.filter((course: any) => isEnrolled(course._id));
const canEdit = currentUser?.role === "FACULTY";
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> 
      <hr />
      
      {canEdit && (
  <>
    <h5>New Course
      <Button variant="primary" className="float-end" id="wd-add-new-course-click" onClick={addNewCourse}>
        Add
      </Button>
      <button className="btn btn-warning float-end me-2" onClick={updateCourse} id="wd-update-course-click">
        Update
      </button>
    </h5>
    
  </>
)}
      
      <FormControl 
        value={course.name} 
        className="mb-2"
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
        placeholder="Course Name"
      />
      <FormControl 
        value={course.description} 
        as="textarea"
        rows={3}
        onChange={(e) => setCourse({ ...course, description: e.target.value })}
        placeholder="Course Description"
      />
      <hr />
      <div className="d-flex justify-content-between align-items-center">
  <h2 id="wd-dashboard-published">
    {showAllCourses ? "All Courses" : "Enrolled Courses"} ({displayedCourses.length})
  </h2>
 <button 
  className={`btn ${enrolling ? 'btn-primary' : 'btn-secondary'}`}
  onClick={() => setEnrolling(!enrolling)}
>
  {enrolling ? 'My Courses' : 'All Courses'}
</button>
</div>
<hr />
  
      
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {displayedCourses.map((course: any) => (
            <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link 
                  to={`/Kambaz/Courses/${course._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <Card.Img src="/images/React.png" variant="top" width="100%" height={160} />
                  <Card.Body className="card-body">
                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name}
                    </Card.Title>
                    <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                      {course.description}
                    </Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
  <Button variant="primary">Go</Button>
  
  <div>
    {/* Enrollment buttons
    {isEnrolled(course._id) ? (
      <button 
        className="btn btn-danger btn-sm me-2"
        onClick={(e) => {
          e.preventDefault();
          handleUnenroll(course._id);
        }}
        disabled={loading}
      >
        Unenroll
      </button>
    ) : (
      <button 
        className="btn btn-success btn-sm me-2"
        onClick={(e) => {
          e.preventDefault();
          handleEnroll(course._id);
        }}
        disabled={loading}
      >
        Enroll
      </button>
    )} */}
{isEnrolled(course._id) ? (
  <button 
    className="btn btn-danger btn-sm me-2"
    onClick={(e) => {
      e.preventDefault();
      updateEnrollment(course._id, false); // <-- NEW
    }}
    disabled={loading}
  >
    Unenroll
  </button>
) : (
  <button 
    className="btn btn-success btn-sm me-2"
    onClick={(e) => {
      e.preventDefault();
      updateEnrollment(course._id, true);  // <-- NEW
    }}
    disabled={loading}
  >
    Enroll
  </button>
)}

    
    {/* Faculty-only buttons */}
    {canEdit && (
      <>
        <button 
          id="wd-edit-course-click"
          onClick={(event) => {
            event.preventDefault();
            setCourse(course);
          }}
          className="btn btn-warning btn-sm me-2"
        >
          Edit
        </button>
        <button 
          onClick={(event) => {
            event.preventDefault();
            deleteCourse(course._id);
          }} 
          className="btn btn-danger btn-sm"
          id="wd-delete-course-click"
        >
          Delete
        </button>
      </>
    )}
  </div>
</div>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}