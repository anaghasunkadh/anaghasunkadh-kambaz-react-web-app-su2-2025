import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2>
      <hr />
      <div id="wd-dashboard-courses">

        {/* Course 1 */}
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1234/Home">
            <img src="/images/React.png" width={200} />
            <div>
              <h5>CS1234 React JS</h5>
              <p>Full Stack Software Developer</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        {/* Course 2 */}
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/2345/Home">
            <img src="/images/Canvas.jpg" width={200} />
            <div>
              <h5>CS2345 Python</h5>
              <p>Data Science Foundations</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        {/* Course 3 */}
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/3456/Home">
            <img src="/images/Canvas.jpg" width={200} />
            <div>
              <h5>CS3456 AI</h5>
              <p>Intro to Artificial Intelligence</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        {/* Course 4 */}
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/4567/Home">
            <img src="/images/Canvas.jpg" width={200} />
            <div>
              <h5>CS4567 Machine Learning</h5>
              <p>Predictive Modeling</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        {/* Course 5 */}
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/5678/Home">
            <img src="/images/Canvas.jpg" width={200} />
            <div>
              <h5>CS5678 Web Dev</h5>
              <p>HTML, CSS, JS</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        {/* Course 6 */}
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/6789/Home">
            <img src="/images/Canvas.jpg" width={200} />
            <div>
              <h5>CS6789 Java</h5>
              <p>Object-Oriented Programming</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        {/* Course 7 */}
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/7890/Home">
            <img src="/images/Canvas.jpg" width={200} />
            <div>
              <h5>CS7890 Databases</h5>
              <p>SQL & NoSQL Systems</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

      </div>
    </div>
  );
}
