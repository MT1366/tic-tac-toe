import { useState } from "react";
import "./App.css";
import MainBoard from "./components/MainBoard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <MainBoard currentPlayer="" />
    </>
  );
}

export default App;
