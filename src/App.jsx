import React, { useState } from "react";
import "./App.css";
import Header from "./Header";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Menu from "./Menu";
import HeaderBlock from "./HeaderBlock";
import Login from "./Login";

import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import Signup from "./Signup";
import TeslaAccount from "./TeslaAccount";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector(selectUser);

  console.log(user);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                {isMenuOpen && <Menu />}
                <HeaderBlock />
              </>
            }
          />
          <Route
            exact
            path="/login"
            element={
              <> {user ? <Navigate to="/teslaaccount" /> : <Login />} </>
            }
          />
          <Route exact path="/signup" element={<Signup />}></Route>
          <Route
            exact
            path="/teslaaccount"
            element={
              <>
                <>
                  {" "}
                  {!user ? (
                    <Navigate to="/login" />
                  ) : (
                    <TeslaAccount
                      isMenuOpen={isMenuOpen}
                      setIsMenuOpen={setIsMenuOpen}
                    />
                  )}{" "}
                  {isMenuOpen && <Menu />}
                </>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
