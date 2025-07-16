import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div id="wd-dashboard" className="p-4">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} sm={2} md={3} lg={4} xl={4} className="g-4">
          {/* Course 1 */}
          <Col className="wd-dashboard-course">
            <Card>
              <Link
                to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <Card.Img variant="top" src="/images/React.png" height={160} />
                <Card.Body>
                  <Card.Title className="text-truncate">CS1234 React JS</Card.Title>
                  <Card.Text style={{ height: "100px", overflow: "hidden" }}>
                    Full Stack Software Developer
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          {/* Course 2 */}
          <Col className="wd-dashboard-course">
            <Card>
              <Link to="/Kambaz/Courses/2345/Home" className="text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/Canvas.jpg" height={160} />
                <Card.Body>
                  <Card.Title className="text-truncate">CS2345 Python</Card.Title>
                  <Card.Text style={{ height: "100px", overflow: "hidden" }}>
                    Data Science Foundations
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          {/* Course 3 */}
          <Col className="wd-dashboard-course">
            <Card>
              <Link to="/Kambaz/Courses/3456/Home" className="text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/Canvas.jpg" height={160} />
                <Card.Body>
                  <Card.Title className="text-truncate">CS3456 AI</Card.Title>
                  <Card.Text style={{ height: "100px", overflow: "hidden" }}>
                    Intro to Artificial Intelligence
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          {/* Course 4 */}
          <Col className="wd-dashboard-course">
            <Card>
              <Link to="/Kambaz/Courses/4567/Home" className="text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/Canvas.jpg" height={160} />
                <Card.Body>
                  <Card.Title className="text-truncate">CS4567 Machine Learning</Card.Title>
                  <Card.Text style={{ height: "100px", overflow: "hidden" }}>
                    Predictive Modeling
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          {/* Course 5 */}
          <Col className="wd-dashboard-course">
            <Card>
              <Link to="/Kambaz/Courses/5678/Home" className="text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/Canvas.jpg" height={160} />
                <Card.Body>
                  <Card.Title className="text-truncate">CS5678 Web Dev</Card.Title>
                  <Card.Text style={{ height: "100px", overflow: "hidden" }}>
                    HTML, CSS, JS
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          {/* Course 6 */}
          <Col className="wd-dashboard-course">
            <Card>
              <Link to="/Kambaz/Courses/6789/Home" className="text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/Canvas.jpg" height={160} />
                <Card.Body>
                  <Card.Title className="text-truncate">CS6789 Java</Card.Title>
                  <Card.Text style={{ height: "100px", overflow: "hidden" }}>
                    Object-Oriented Programming
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          {/* Course 7 */}
          <Col className="wd-dashboard-course">
            <Card>
              <Link to="/Kambaz/Courses/7890/Home" className="text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/Canvas.jpg" height={160} />
                <Card.Body>
                  <Card.Title className="text-truncate">CS7890 Databases</Card.Title>
                  <Card.Text style={{ height: "100px", overflow: "hidden" }}>
                    SQL & NoSQL Systems
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
