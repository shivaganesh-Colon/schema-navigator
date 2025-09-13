import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';


import MainLogicPage from './mainroutes/home';
import Queryrender from './mainroutes/queryrender'; // Adjust the path as necessary
import Chatboat from './mainroutes/chatboat';
 // Adjust the path as necessary

const Header = () => (
  <nav className="navbar navbar-dark bg-primary px-3">
    <span className="navbar-brand mb-0 h1">FieldMapper</span>
  </nav>
);

const Sidebar = () => (
  <div className="bg-primary text-white vh-100 p-3" style={{ width: '220px' }}>
    <h5>Menu</h5>
    <ul className="nav flex-column">
      <li className="nav-item mb-2">
        <Link to="/" className="nav-link text-white">Field Mapper</Link>
        <Link to="/queryrender" className="nav-link text-white">Query Render</Link>
        <Link to="/chatboat" className="nav-link text-white">ollama</Link>


      </li>
      {/* Add more menu links here */}
    </ul>
  </div>
);

function App() {
  return (
    <Router>
      <Header />
      <div className="d-flex">
        <Sidebar />
        <main className="flex-grow-1 p-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
          <Routes>
            <Route path="/" element={<MainLogicPage />} />
            <Route path="/queryrender" element={<Queryrender />} />
            <Route path="/chatboat" element={<Chatboat />} />


            {/* Add more routes here */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;