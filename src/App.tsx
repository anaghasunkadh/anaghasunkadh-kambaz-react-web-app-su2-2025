import Labs  from "./Labs/index.tsx"
import Kambaz from "./Kambaz";
import { HashRouter, Route, Routes,Navigate  } from "react-router-dom";
import LandingPage from "./Landing.tsx";

function App() {
 return(
  
    <HashRouter>
 <div>

 <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path="/" element={<Navigate to="Kambaz" />} />
          <Route path="/Labs/*" element={<Labs />} />
          <Route path="/Kambaz/*" element={<Kambaz />} />
        </Routes></div>
 </HashRouter>)
}

export default App
