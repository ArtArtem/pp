import React from 'react';
import { Link } from "react-router-dom";
const Navbar= () =>{
  return (
    <div>
      <li>
        <Link to="/">Main</Link>
      </li>
      <li>
        <Link to="/view">View</Link>
      </li>
    </div>
  );
}
export default Navbar;
