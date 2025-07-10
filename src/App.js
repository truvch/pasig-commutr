import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MainContent from './components/MainContent';
import RouteArchives from './pages/RouteArchives';
import './App.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/routes" element={<RouteArchives />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
