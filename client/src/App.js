import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Routes from "./routes";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
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
    </Router>
  );
};

export default App;
