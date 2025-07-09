import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div>
      <h1><b>Anagha Srinath</b></h1>
      <h2><b>CS5610 - Summer 02 course</b></h2>

      <h3><b>Lab Assignments</b></h3>
      <ul>
        <li><Link to="/Labs/Lab1">Lab 1</Link></li>
        <li><Link to="/Labs/lab2">Lab 2</Link></li>
        <li><Link to="/Labs/lab3">Lab 3</Link></li>
      </ul>

      <h3><b>Kambaz App</b></h3>
      <Link to="/Kambaz">Go to Kanbas App</Link>

      <h3><b>GitHub Repositories</b></h3>
      <a
        href="https://github.com/anaghasunkadh/anaghasunkadh-kambaz-react-web-app-su2-2025/tree/a1"
        target="blank"
        rel="noreferrer"
      >
        Assignment 1     </a>
    </div>
  );
}
