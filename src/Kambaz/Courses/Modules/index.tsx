export default function Modules() {
  return (
    <div>
      <button>Collapse All</button>
  <button>View Progress</button>
  <button>Publish All</button>
  <button>Module Settings</button>
  <button>+ Module</button>
      <ul id="wd-modules">
        <li className="wd-module">
          <div className="wd-title">Week 1</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to the course</li>
                <li className="wd-content-item">Learn what is Web Development</li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="wd-module">
          <div className="wd-title">Week 2</div>
          <ul className="wd-lessons">
    <li className="wd-lesson">
      <span className="wd-title">HTML Basics</span>
      <ul className="wd-content">
        <li className="wd-content-item">Elements and Tags</li>
        <li className="wd-content-item">Creating a Web Page</li>
      </ul>
    </li>
  </ul>
        </li>
        <li className="wd-module">
          <div className="wd-title">Week 3</div>
          <ul className="wd-lessons">
    <li className="wd-lesson">
      <span className="wd-title">CSS Fundamentals</span>
      <ul className="wd-content">
        <li className="wd-content-item">Selectors and Properties</li>
        <li className="wd-content-item">Box Model</li>
      </ul>
    </li>
  </ul>
        </li>
      </ul>
    </div>
  );
}
