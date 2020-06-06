import React from "react";
import "./App.css";
import CakeOMeter from "./components/CakeOMeter";
import CakeOMeterBasic from "./components/CakeOMeterBasic";
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>CakeOmeter</p>
      </header>
      <main>
        <Switch>
          <Route path="/" component={CakeOMeterBasic} exact />
          <Route path="/recipe" component={CakeOMeter} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
