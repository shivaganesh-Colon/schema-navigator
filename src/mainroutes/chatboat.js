import React, { useState } from "react";

function Chatboat() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("http://localhost:8000/api/ollama/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setResponse(data.response);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Ollama Chat</h1>
      <form onSubmit={handleSubmit}>
<textarea className="form-control mb-3" rows="10" placeholder="Enter your SQL query here..."
 onChange={(e) => setPrompt(e.target.value)}
>{prompt}</textarea>

        {/* <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          style={{ width: "300px" }}
          placeholder="Type your prompt..."
        /> */}
        <button type="submit">Send</button>
      </form>
      <div style={{ marginTop: 20 }}>
        <strong>Response:</strong>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default Chatboat;
