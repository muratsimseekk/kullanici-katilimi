import logo from "./logo.svg";
import "./App.css";
import Formlar from "./components/Form";
import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  return (
    <div className="App">
      <Formlar />
    </div>
  );
}

export default App;
