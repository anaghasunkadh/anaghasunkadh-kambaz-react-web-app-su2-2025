import Labs  from "./Labs/index.tsx"
import Kambaz from "./Kambaz";
import { HashRouter, Route, Routes,Navigate  } from "react-router-dom";
import LandingPage from "./Landing.tsx";
import store from "./Kambaz/store";
import { Provider } from "react-redux";

function App() {
 return(
  
    <HashRouter>
      <Provider store={store}>
      
 <div>

 <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path="/" element={<Navigate to="Kambaz" />} />
          <Route path="/Labs/*" element={<Labs />} />
          <Route path="/Kambaz/*" element={<Kambaz />} />
        </Routes></div>
        </Provider>
 </HashRouter>)
}

export default App
