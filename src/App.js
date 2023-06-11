import './App.css';
import CSvFile from './components/Csv/CSvFile';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <CSvFile />
      {/* <Footer /> */}
    </div>
  );
}

export default App;
