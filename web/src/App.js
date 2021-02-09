import React from "react";
import { Upload } from "./Upload";
import { Files } from "./Files";
import { Resized } from "./Resized";

function App() {
  return (
    <div>
      <Upload />
      <Files />
      <Resized />
    </div>
  );
}

export default App;
