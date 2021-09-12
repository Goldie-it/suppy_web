import React from "react";
import { Home } from "./pages/Home";
import { LoadingPage } from "./pages/LoadingPage";

import { HashRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/:shopName">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
