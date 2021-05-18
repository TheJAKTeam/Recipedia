import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Routes from "./routes";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  const location = window.location.pathname;
  const style = {
    width: "100%",
    maxWidth: "100%"
  }
  return (
    <Router>
      <header>
          <Navbar />
      </header>
      <main>
        <div className="container">
          <Routes />
        </div> 
      </main>

      <ToastContainer />
    </Router>
  );
};

export default App;
