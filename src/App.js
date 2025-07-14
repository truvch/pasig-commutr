import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RouteArchives from './pages/RouteArchives';
import Contribute from './pages/Contribute';
import './App.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/routes" element={<RouteArchives />} />
          <Route path="/contribute" element={<Contribute />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
