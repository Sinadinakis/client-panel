import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import AppNavbar from './components/layout/AppNavbar';
import Dashboard from './components/layout/Dashboard';
import Sidebar from './components/layout/Sidebar';

function App() {
  return (
      <Router>
        <div className="App">
          <AppNavbar />
          <div className="container mx-auto px-8">
            <Switch>
              <Route exact path="/" component= {Dashboard} />
              <Route exact path="/sidebar" component= {Sidebar} />
            </Switch>
          </div>
        </div>
      </Router>
  );
}

export default App;
