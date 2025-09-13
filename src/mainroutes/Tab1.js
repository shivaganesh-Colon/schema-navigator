import React, { useState } from "react";
import { Table, Button, Form } from "react-bootstrap";

export default function Tab1() {
    const [query, setQuery] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [chatTable, setChatTable] = useState([]);
    const [response, setResponse] = useState("");
    const [Headers, setHeaders] = useState();
    
    async function handleQuerySubmit(e) {
      e.preventDefault();
      const res = await fetch("http://localhost:8000/api/ollama/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      console.log(data.response.data);
   
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
            <td>{row.customer_no}</td>
            <td>{row.rep ? "Yes" : "No"}</td>
            <td>{row.personal_info.name}</td>
            <td>{row.personal_info.email}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
  return (
    <>
      <Form onSubmit={handleQuerySubmit} className="mb-3">
        <Form.Group controlId="queryTextarea">
          <Form.Label>Enter Query</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type your query..."
          />
        </Form.Group>
        <Button type="submit" className="mt-2">Submit</Button>
      </Form>
      <h5>Results</h5>
      {response.data && response.data.length > 0
          ? <CustomerTable rows={response.data} />
          : null}
    </>
  );
}
