import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Authentication from './Authentication';
import Registration from './Registration';
import Information from './Information';

function App() {
    const navigate = useNavigate();
    const [token, setToken] = useState("0.0.0");

  return (
      <Routes>
          <Route exact path="/" element={<Navigate replace to="/authentication" />} />
          <Route exact path="/authentication" element={<Authentication toRegistration={() => navigate("/registration")} toInformation={() => navigate("/information")} setToken={setToken}/>} />
          <Route exact path="/registration" element={<Registration toAuthentication={() => navigate("/authentication")} />} />
          <Route exact path="/information" element={<Information toAuthentication={() => navigate("/authentication")} setToken={setToken} token={token}/>} />
      </Routes>
  );
}

export default App;