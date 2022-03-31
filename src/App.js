import Home from "./Components/Home";
import "./Style/style.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Routes>
          <Route path="/projects" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
