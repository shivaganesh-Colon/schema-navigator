import React, { useState } from "react";
import { Table, Button, Form } from "react-bootstrap";

export default function Tab2() {
  const [prompt, setPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [chatTable, setChatTable] = useState([]);
  const [response, setResponse] = useState("");
  const [Headers, setHeaders] = useState();
  
  async function handlePromptSubmit(e) {
    console.log(chatHistory)
    let finalPrompt = prompt;
    if(chatHistory && chatHistory.length >0){
        console.log("chatHistory",chatHistory)
        finalPrompt = [...chatHistory.map(item => item.text), finalPrompt].join(" ");
     await  setPrompt(prevPrompt => [prevPrompt, ...chatHistory.map(item => item.text)].join(" "));
    }
    console.log(finalPrompt)
    e.preventDefault();
    
    const res = await fetch("http://localhost:8000/api/ollama/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt:finalPrompt }),
    });
    const data = await res.json();
    console.log(data.response.data);
    setChatHistory((prev) => [
        ...prev,
        { sender: "user", text: prompt },
       
      ]);
    setResponse(data.response);
  }
  const CustomerTable = ({ rows }) => (
    <Table striped bordered>
      <thead>
        <tr>
          <th>#</th>
          <th>Customer No</th>
          <th>Rep</th>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, idx) => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row?.customer_no}</td>
            <td>{row.rep ? "Yes" : "No"}</td>
            <td>{row?.personal_info?.name}</td>
            <td>{row?.personal_info?.email}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
  return (
    <>
      <div className="mb-3" style={{ minHeight: "200px", background: "#f8f9fa", borderRadius: "5px", padding: "16px" }}>
        {chatHistory.map((msg, idx) => (
          <div key={idx} className={msg.sender === "user" ? "text-end mb-2" : "text-start mb-2"}>
            <span
              className="d-inline-block p-2 rounded"
              style={{
                background: msg.sender === "user" ? "#007bff" : "#e9ecef",
                color: msg.sender === "user" ? "#fff" : "#000",
                maxWidth: "70%",
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <Form onSubmit={handlePromptSubmit} className="mb-3">
        <Form.Control
          as="textarea"
          rows={2}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your prompt..."
        />
        <Button type="submit" className="mt-2">Send</Button>
         <textarea
            className="form-control mb-3"
            rows="2"
            placeholder="Formated Query"
            disabled
            value={response.Formated_Query || ""} // Use value attribute
            />
      </Form>
      <h5>Results Table</h5>
              {response.data && response.data.length > 0
          ? <CustomerTable rows={response.data} />
          : null}
      
    </>
  );
}
