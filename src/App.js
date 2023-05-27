import React from 'react';
import {Route, Link, Routes} from 'react-router-dom';
import BuildForm from "./pages/main";
import View from "./pages/view";

export default function App() {

  return (
    <div>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/view">View</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/view" element={<View />} />
          <Route path="/" element={<BuildForm />} />
        </Routes>
      </div>
    </div>
  );
}
