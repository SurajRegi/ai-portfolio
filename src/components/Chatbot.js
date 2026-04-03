import { useState, useRef, useEffect } from "react";
import data from "../data";

function Chatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const windowRef = useRef(null);

  useEffect(() => {
    if (windowRef.current) {
      windowRef.current.scrollTop = windowRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    // Input validation — max 300 chars
    if (!input.trim() || input.length > 300) return;

    const userMsg = input.trim();
    const newMessages = [...messages, { role: "user", text: userMsg }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      // Calls your own backend — API key never touches the browser
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are an AI assistant for Suraj's portfolio. Be concise and professional.\n\nUse ONLY this data:\n${JSON.stringify(data)}\n\nUser question: ${userMsg}`,
                },
              ],
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const result = await response.json();
      const reply =
        result?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response from AI";

      setMessages([...newMessages, { role: "bot", text: reply }]);
    } catch (error) {
      console.error(error);
      setMessages([
        ...newMessages,
        { role: "bot", text: "Error connecting to AI. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="chatbox">
      <div className="chat-label">Ask me anything</div>
      <h2>AI <em>Assistant</em></h2>
      <p className="chat-intro">
        Curious about my work or skills? Ask the AI — it knows everything about me.
      </p>

      <div className="chat-window" ref={windowRef}>
        {messages.length === 0 && (
          <div className="bot" style={{ opacity: 0.5 }}>
            Hi! Ask me anything about Suraj's projects, skills, or experience.
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={msg.role}>
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="bot" style={{ opacity: 0.5 }}>
            Thinking…
          </div>
        )}
      </div>

      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask about projects, skills, experience…"
          maxLength={300}
        />
        <button onClick={sendMessage} disabled={loading}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
