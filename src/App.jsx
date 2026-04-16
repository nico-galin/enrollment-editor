import { useState } from "react";
import ConfigPane from "./ConfigPane";
import Preview from "./Preview";
import { defaultData } from "./defaultData";

function App() {
  const [data, setData] = useState(defaultData);

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", fontFamily: "Arial, sans-serif" }}>
      <ConfigPane data={data} onChange={setData} />
      <div style={{ flex: 1, overflowY: "auto", background: "#f4f4f4" }}>
        <Preview data={data} />
      </div>
    </div>
  );
}

export default App;
