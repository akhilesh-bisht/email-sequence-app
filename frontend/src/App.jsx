import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Sign";
import FlowBuilder from "./pages/FlowChart";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/flow" element={<FlowBuilder />} />
      </Routes>
    </Router>
  );
}

export default App;
