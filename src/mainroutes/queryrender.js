import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Tabs, Tab } from "react-bootstrap";

import Tab1 from "./Tab1";
import Tab2 from "./Tab2";


function App() {
    const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [Headers, setHeaders] = useState();


  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("http://localhost:8000/api/ollama/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    console.log(data.response.data);
 
    setResponse(data.response);
  }

//   return (
// <>
// <form onSubmit={handleSubmit}>
// <textarea className="form-control mb-3" rows="10" placeholder="Enter your SQL query here..."
//  onChange={(e) => setPrompt(e.target.value)}
// >{prompt}</textarea>

      
//         <button type="submit">Generate Query</button>
//       </form>

// <div className="mb-3">
// <textarea
//   className="form-control mb-3"
//   rows="2"
//   placeholder="Formated Query"
//   disabled
//   value={response.Formated_Query || ""} // Use value attribute
// /></div>
// <div className="mb-3">
//   <table border="1" cellPadding="5" cellSpacing="0">
//     <thead>
//       <tr>
//         {response.data && response.data.length > 0
//           ? Object.keys(response.data[0]).map((key) => (
//               <th key={key}>{key}</th>
//             ))
//           : null}
//       </tr>
//     </thead>
//     <tbody>
//       {response.data?.map((row, rowIndex) => (
//         <tr key={rowIndex}>
//           {Object.keys(row).map((key) => (
//             <td key={key}>{row[key]}</td>
//           ))}
//         </tr>
//       ))}
//     </tbody>
//   </table>
// </div>

// </>
//   );

return (
  <div className="container mt-5">
    <Tabs defaultActiveKey="tab1" id="tabs-demo" className="mb-3">
      <Tab eventKey="tab1" title="By Query">
        <Tab1 />
      </Tab>
      <Tab eventKey="tab2" title="By Prompt">
        <Tab2 />
      </Tab>
    </Tabs>
  </div>
);
}

export default App;