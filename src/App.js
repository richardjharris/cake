import React from "react";
import "./App.css";
import CakeOMeter from "./components/CakeOMeter";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>CakeOmeter</p>
      </header>
      <main>
        <CakeOMeter />
      </main>
    </div>
  );
}

export default App;
