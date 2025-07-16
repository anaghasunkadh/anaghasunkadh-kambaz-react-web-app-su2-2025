import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Row, Col } from 'react-bootstrap';

export default function AssignmentEditor() {
  return (
    <div className="container mt-4" id="wd-assignments-editor">
      <h2 className="mb-4">Edit Assignment</h2>
      <Form>

        {/* Assignment Name */}
        <Row className="mb-3">
          <Col md={3}>
            <Form.Label htmlFor="wd-name">Assignment Name</Form.Label>
          </Col>
          <Col md={9}>
            <Form.Control id="wd-name" type="text" defaultValue="A1 - ENV + HTML" />
          </Col>
        </Row>

        {/* Description */}
        <Row className="mb-3">
          <Col md={3}>
            <Form.Label htmlFor="wd-description">Description</Form.Label>
          </Col>
          <Col md={9}>
            <Form.Control
              id="wd-description"
              as="textarea"
              rows={6}
              defaultValue={`The assignment is available online. Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following:
- Your full name and section
- Links to each of the lab assignments
- Link to the Kanbas application
- Links to all relevant source code repositories

The Kanbas application should include a link to navigate back to the landing page.`}
            />
          </Col>
        </Row>

        {/* Points */}
        <Row className="mb-3">
          <Col md={3}>
            <Form.Label htmlFor="wd-points">Points</Form.Label>
          </Col>
          <Col md={9}>
            <Form.Control id="wd-points" type="number" defaultValue={100} />
          </Col>
        </Row>

        {/* Assignment Group */}
        <Row className="mb-3">
          <Col md={3}>
            <Form.Label htmlFor="wd-group">Assignment Group</Form.Label>
          </Col>
          <Col md={9}>
            <Form.Select id="wd-group">
              <option>ASSIGNMENTS</option>
              <option>Labs</option>
              <option>Evaluation</option>
            </Form.Select>
          </Col>
        </Row>

        {/* Display Grade as */}
        <Row className="mb-3">
          <Col md={3}>
            <Form.Label htmlFor="wd-display-grade-as">Display Grade as</Form.Label>
          </Col>
          <Col md={9}>
            <Form.Select id="wd-display-grade-as">
              <option>Percentage</option>
              <option>Points</option>
              <option>Letter</option>
            </Form.Select>
          </Col>
        </Row>

        {/* Submission Type */}
        <Row className="mb-3">
          <Col md={3}>
            <Form.Label htmlFor="wd-submission-type">Submission Type</Form.Label>
          </Col>
          <Col md={9}>
            <Form.Select id="wd-submission-type">
              <option>Online</option>
              <option>In Person</option>
            </Form.Select>
          </Col>
        </Row>

        {/* Online Entry Options */}
        <Row className="mb-4">
          <Col md={3}>
            <Form.Label>Online Entry Options</Form.Label>
          </Col>
          <Col md={9}>
            <div className="d-flex flex-column">
              <Form.Check type="checkbox" id="wd-text-entry" label="Text Entry" className="mb-2" />
              <Form.Check type="checkbox" id="wd-website-url" label="Website URL" className="mb-2" />
              <Form.Check type="checkbox" id="wd-media-recordings" label="Media Recordings" className="mb-2" />
              <Form.Check type="checkbox" id="wd-student-annotation" label="Student Annotation" className="mb-2" />
              <Form.Check type="checkbox" id="wd-file-upload" label="File Uploads" />
            </div>
          </Col>
        </Row>

        {/* Assign to */}
        <Row className="mb-3">
          <Col md={3}>
            <Form.Label htmlFor="wd-assign-to">Assign to</Form.Label>
          </Col>
          <Col md={9}>
            <Form.Control id="wd-assign-to" type="text" defaultValue="Everyone" />
          </Col>
        </Row>

        {/* Due Date */}
        <Row className="mb-3">
          <Col md={3}>
            <Form.Label htmlFor="wd-due-date">Due Date</Form.Label>
          </Col>
          <Col md={9}>
            <Form.Control id="wd-due-date" type="date" defaultValue="2025-07-15" />
          </Col>
        </Row>

        {/* Available from */}
        <Row className="mb-3">
          <Col md={3}>
            <Form.Label htmlFor="wd-available-from">Available from</Form.Label>
          </Col>
          <Col md={9}>
            <Form.Control id="wd-available-from" type="date" defaultValue="2025-07-10" />
          </Col>
        </Row>

        {/* Until */}
        <Row className="mb-3">
          <Col md={3}>
            <Form.Label htmlFor="wd-available-until">Until</Form.Label>
          </Col>
          <Col md={9}>
            <Form.Control id="wd-available-until" type="date" defaultValue="2025-07-20" />
          </Col>
        </Row>

        {/* Buttons */}
        <Row className="mt-4">
          <Col md={12} className="d-flex justify-content-end">
            <Button variant="secondary" className="me-2">Cancel</Button>
            <Button variant="danger">Save</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}