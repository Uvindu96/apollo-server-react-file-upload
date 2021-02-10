import React from "react";
import { Nav, Upload } from "./Upload";
import { Files } from "./Files";
import { Resized } from "./Resized";

function App() {
  return (
    <div>
      <Nav />
      <Upload />
      <Files />
      <Resized />
    </div>
  );
}

export default App;
