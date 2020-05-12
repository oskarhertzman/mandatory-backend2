import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import './styles/App.css';

import Main from './pages/Main';

function App() {
  return (
    <div className="App">
      <HelmetProvider>
        <Router>
          <Route exact path="/" render={props => <Main {...props} />} />
        </Router>
      </HelmetProvider>
    </div>
  );
}

export default App;
