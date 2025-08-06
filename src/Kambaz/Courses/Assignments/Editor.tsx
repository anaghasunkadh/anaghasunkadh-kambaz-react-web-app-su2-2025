import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateAssignment, setAssignments } from './reducer';
import * as assignmentsClient from "./client";

export default function AssignmentEditor() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Log all params to see what we're getting
  console.log('ALL URL PARAMS:', params);
  console.log('assignmentId param:', params.assignmentId);
  console.log('cid param:', params.cid);
  console.log(' All keys in params:', Object.keys(params));
  
  const { cid, aid: assignmentId } = params;
  
  // Get assignments from Redux store
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  
  // Determine if we're creating or editing
  const isNewAssignment = assignmentId === 'new';
  
  // Find existing assignment
  const existingAssignment = !isNewAssignment ? 
    assignments.find((assignment: any) => assignment._id === assignmentId) : null;
  
  console.log(' COMPLETE DEBUG INFO:');
  console.log('URL:', window.location.href);
  console.log('assignmentId from params:', assignmentId);
  console.log('cid from params:', cid);
  console.log('isNewAssignment:', isNewAssignment);
  console.log('existingAssignment found:', existingAssignment);
  console.log('All assignments in store:', assignments.map((a: any) => ({ id: a._id, title: a.title })));
  
  // State for form data
  const [assignment, setAssignment] = useState({
    _id: '',
    title: 'New Assignment',
    description: `The assignment is available online...`,
    points: 100,
    dueDate: '2025-07-15',
    availableFromDate: '2025-07-10',
    availableUntilDate: '2025-07-20',
    course: cid || ''
  });

  // Load existing assignment data when editing
  useEffect(() => {
    if (!isNewAssignment && existingAssignment) {
      console.log(' Loading existing assignment:', existingAssignment);
      setAssignment({
        _id: existingAssignment._id,
        title: existingAssignment.title || 'New Assignment',
        description: existingAssignment.description || '',
        points: existingAssignment.points || 100,
        dueDate: existingAssignment.dueDate || '2025-07-15',
        availableFromDate: existingAssignment.availableFromDate || '2025-07-10',
        availableUntilDate: existingAssignment.availableUntilDate || '2025-07-20',
        course: existingAssignment.course || cid || '',
      });
    }
  }, [isNewAssignment, existingAssignment, cid]);

  // Handle form field changes
  const handleChange = (field: string, value: any) => {
    setAssignment(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle save - UPDATED TO USE SERVER API
  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      if (isNewAssignment) {
        const newAssignment = {
          title: assignment.title,
          description: assignment.description,
          points: assignment.points,
          dueDate: assignment.dueDate,
          availableFromDate: assignment.availableFromDate,
          availableUntilDate: assignment.availableUntilDate,
          course: cid
        };
        await assignmentsClient.createAssignmentForCourse(cid!, newAssignment);
        
        // Refresh assignments from server
        const assignments = await assignmentsClient.findAssignmentsForCourse(cid!);
        dispatch(setAssignments(assignments));
      } else {
        const assignmentToUpdate = {
          ...assignment,
          _id: assignmentId,
          course: cid
        };
        await assignmentsClient.updateAssignment(assignmentToUpdate);
        dispatch(updateAssignment(assignmentToUpdate));
      }

      navigate(`/Kambaz/Courses/${cid}/Assignments`);
    } catch (error) {
      console.error("Error saving assignment:", error);
    }
  };

  // Handle cancel
  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };

  // If assignmentId is undefined, show debug info
  if (assignmentId === undefined) {
    return (
      <div className="container mt-4">
        <h2>URL Parameter Debug</h2>
        <div style={{ background: '#ffebee', padding: '20px', border: '1px solid red' }}>
          <h4>Assignment ID is undefined!</h4>
          <p><strong>Current URL:</strong> {window.location.href}</p>
          <p><strong>All URL params:</strong> {JSON.stringify(params)}</p>
          <p><strong>assignmentId param:</strong> {assignmentId}</p>
          <p><strong>cid param:</strong> {cid}</p>
          <p><strong>Expected format:</strong> /Kambaz/Courses/[COURSE_ID]/Assignments/[ASSIGNMENT_ID]</p>
        </div>
        <Button onClick={() => navigate(`/Kambaz/Courses/${cid}/Assignments`)}>
          Back to Assignments
        </Button>
      </div>
    );
  }

  // If we're trying to edit but can't find the assignment
  if (!isNewAssignment && !existingAssignment) {
    return (
      <div className="container mt-4">
        <h2>Assignment Not Found</h2>
        <div style={{ background: '#fff3cd', padding: '20px', border: '1px solid orange' }}>
          <p><strong>Looking for assignment ID:</strong> {assignmentId}</p>
          <p><strong>Available assignment IDs:</strong> {assignments.map((a: any) => a._id).join(', ')}</p>
          <p><strong>Current URL:</strong> {window.location.href}</p>
        </div>
        <Button onClick={() => navigate(`/Kambaz/Courses/${cid}/Assignments`)}>
          Back to Assignments
        </Button>
      </div>
    );
  }

  return (
    <div className="container mt-4" id="wd-assignments-editor">
      <h2 className="mb-4">{isNewAssignment ? 'Create Assignment' : 'Edit Assignment'}</h2>
      
     
      
      <Form>
        <Row className="mb-3">
          <Col md={3}>
            <Form.Label htmlFor="wd-name">Assignment Name</Form.Label>
          </Col>
          <Col md={9}>
            <Form.Control 
              id="wd-name" 
              type="text" 
              value={assignment.title}
              onChange={(e) => handleChange('title', e.target.value)}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={3}>
            <Form.Label htmlFor="wd-description">Description</Form.Label>
          </Col>
          <Col md={9}>
            <Form.Control
              id="wd-description"
              as="textarea"
              rows={6}
              value={assignment.description}
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={3}>
            <Form.Label htmlFor="wd-points">Points</Form.Label>
          </Col>
          <Col md={9}>
            <Form.Control 
              id="wd-points" 
              type="number" 
              value={assignment.points}
              onChange={(e) => handleChange('points', parseInt(e.target.value) || 0)}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={3}>
            <Form.Label htmlFor="wd-due-date">Due Date</Form.Label>
          </Col>
          <Col md={9}>
            <Form.Control 
              id="wd-due-date" 
              type="date" 
              value={assignment.dueDate}
              onChange={(e) => handleChange('dueDate', e.target.value)}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={3}>
            <Form.Label htmlFor="wd-available-from">Available from</Form.Label>
          </Col>
          <Col md={9}>
            <Form.Control 
              id="wd-available-from" 
              type="date" 
              value={assignment.availableFromDate}
              onChange={(e) => handleChange('availableFromDate', e.target.value)}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={3}>
            <Form.Label htmlFor="wd-available-until">Until</Form.Label>
          </Col>
          <Col md={9}>
            <Form.Control 
              id="wd-available-until" 
              type="date" 
              value={assignment.availableUntilDate}
              onChange={(e) => handleChange('availableUntilDate', e.target.value)}
            />
          </Col>
        </Row>

        <Row className="mt-4">
          <Col md={12} className="d-flex justify-content-end">
            <Button 
              variant="secondary" 
              className="me-2"
              onClick={handleCancel}
              type="button"
            >
              Cancel
            </Button>
            <Button 
              variant="danger" 
              onClick={handleSave}
              type="button"
            >
              {isNewAssignment ? 'Save' : 'Update'}
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}