import React, {useState} from 'react';
import {Route, Link, Routes} from 'react-router-dom';
import BuildForm from "./pages/main";
import View from "./pages/view";

export default function App() {
  const [login, setLogin] = useState(false);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const viewLink = login ? "/view" : "/";
  const createLink = login ? "/create" : "/";

  return (
    <div>
      {!login ? <>
        <input placeholder={"Login"} onChange={(value) => setUserName(value.target.value)}/>
        <br />
        <input placeholder={"Password"} type="password" onChange={(value) => setPassword(value.target.value)}/>
        <br />
        <button onClick={() => {if (username === 'test' && password === '1234') setLogin(true)}}>
          login
        </button>
      </>
      : <button onClick={() => setLogin(false)}>logout</button>
      }
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to={createLink}>Create</Link>
            </li>
            <li>
              <Link to={viewLink}>View</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/create" element={<BuildForm />} />
          <Route path="/view" element={<View />} />
          <Route path="/" element={<p>Сайт по сборке и просмотру сборок компьютеров</p>} />
        </Routes>
      </div>
    </div>
  );
}
