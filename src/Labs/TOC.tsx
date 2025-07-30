// import { Link } from "react-router-dom";

// export default function TOC() {
//   return (
//     <ul>
//       <li><Link to="/Labs">Labs</Link></li>
//       <li><Link to="/Labs/Lab1">Lab 1</Link></li>
//       <li><Link to="/Labs/Lab2">Lab 2</Link></li>

//       <li><Link to="/Labs/Lab3">Lab 3</Link></li>
//       <li><Link to="/Kambaz">Kambaz</Link></li>
//     </ul>
//   );
// }
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { useLocation } from "react-router"
export default function TOC() {
const { pathname } = useLocation()
 return (
  //  <Nav variant="pills">
  //    <Nav.Item>
  //      <Nav.Link to="/Labs" as={Link}>Lab 1</Nav.Link>
  //    </Nav.Item>
  //    <Nav.Item>
  //      <Nav.Link to="/Labs/Lab1" as={Link}>Lab 1</Nav.Link>
  //    </Nav.Item>
  //    <Nav.Item>
  //      <Nav.Link to="/Labs/Lab2" as={Link} active>Lab 2</Nav.Link>
  //    </Nav.Item>
  //    <Nav.Item>
  //      <Nav.Link to="/Labs/Lab3" as={Link}>Lab 3</Nav.Link>
  //    </Nav.Item>
  //    <Nav.Item>
  //      <Nav.Link to="/Kambaz" as={Link}>Kambaz</Nav.Link>
  //    </Nav.Item>
  //    <Nav.Item>
  //      <Nav.Link href="https://github.com/anaghasunkadh/anaghasunkadh-kambaz-react-web-app-su2-2025">My GitHub</Nav.Link>
  //    </Nav.Item>
  //  </Nav>
   <Nav variant="pills" id="wd-toc">
      <Nav.Item> <Nav.Link as={Link} to="/Labs/Lab1" id="wd-a1"
          active={pathname.includes("Lab1")}> Lab 1 </Nav.Link> </Nav.Item>
      <Nav.Item> <Nav.Link as={Link} to="/Labs/Lab2" id="wd-a2"
          active={pathname.includes("Lab2")}> Lab 2 </Nav.Link> </Nav.Item>
      <Nav.Item> <Nav.Link as={Link} to="/Labs/Lab3" id="wd-a3"
          active={pathname.includes("Lab3")}> Lab 3 </Nav.Link> </Nav.Item>
        <Nav.Item> <Nav.Link as={Link} to="/Labs/Lab4" id="wd-a3"
          active={pathname.includes("Lab3")}> Lab 4 </Nav.Link> </Nav.Item>
      <Nav.Item> <Nav.Link as={Link} to="/Kambaz" id="wd-a3"> Kambaz </Nav.Link> </Nav.Item>
      <Nav.Item> <Nav.Link href="https://github.com/anaghasunkadh/anaghasunkadh-kambaz-react-web-app-su2-2025" target="_blank"> My GitHub </Nav.Link> </Nav.Item>
    </Nav>

   );}
