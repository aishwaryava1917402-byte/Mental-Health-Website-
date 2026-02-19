import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Assessment from "./pages/Assessment";
import Results from "./pages/Results";

function App() {
  return (
    <div className="App">
      <div className="noise-texture"></div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/assessment/:assessmentId" element={<Assessment />} />
          <Route path="/results/:assessmentId" element={<Results />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;