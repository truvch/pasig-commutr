import Navbar from './components/navbar';
import MainMap from './components/map';
import logo from './assets/logo.svg';
import './App.css';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <MainMap />
    </div>
  );
}

export default App;
