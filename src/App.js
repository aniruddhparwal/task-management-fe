import Home from "./Components/Home";
import "./Style/style.css";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function App() {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/v1/`, {
        withCredentials: true,
      })
      .then(function (response) {
        if (response.status === 200) {
          navigate("/projects", { state: { name: response.data.data.name } });
        } else {
          navigate("/");
        }
      })
      .catch(function (error) {
        navigate("/");
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Routes>
        <Route path="/projects" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
